using Microsoft.Data.SqlClient;
using TicketService.API.DTOs;
using TicketService.API.Models;
using Dapper;

namespace TicketService.API.Repositories;

public class TicketRepositoryDapper : ITicketRepository
    {
        private readonly IConfiguration _configuration;

        public TicketRepositoryDapper(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private string GetConnectionString(string userId)
        {
            
            int shard = int.Parse(userId) % 3 + 1;
            var connectionString = Environment.GetEnvironmentVariable($"CONNECTION_STRING_SHARD{shard}");
            Console.WriteLine($"SHARD USED: {shard}");
            if (string.IsNullOrEmpty(connectionString))
            {
                throw new InvalidOperationException($"Connection string for shard {shard} not found.");
            }

            return connectionString;
        }


        public async Task<Ticket> CreateTicketAsync(Ticket ticket)
        {
            var query = "INSERT INTO Tickets (TicketId, UserId, EventId, QRContent, IsUsed, DateIssued, DateUsed) " +
                        "VALUES (@TicketId, @UserId, @EventId, @QRContent, @IsUsed, @DateIssued, @DateUsed)";

            using (var connection = new SqlConnection(GetConnectionString(ticket.UserId)))
            {
                await connection.OpenAsync();
                await connection.ExecuteAsync(query, ticket);
            }

            return ticket;
        }

        public async Task<ICollection<Ticket>> CreateTicketsAsync(ICollection<Ticket> tickets)
        {
            var query = "INSERT INTO Tickets (TicketId, UserId, EventId, QRContent, IsUsed, DateIssued, DateUsed) " +
                        "VALUES (@TicketId, @UserId, @EventId, @QRContent, @IsUsed, @DateIssued, @DateUsed)";

            using (var connection = new SqlConnection(GetConnectionString(tickets.First().UserId)))
            {
                await connection.OpenAsync();
                await connection.ExecuteAsync(query, tickets);
            }

            return tickets;
        }

        public async Task<IEnumerable<Ticket>> GetAllTicketAsync()
        {
            var query = "SELECT * FROM Tickets";

            using (var connection = new SqlConnection(GetConnectionString("1"))) // Default shard (can adjust logic here)
            {
                await connection.OpenAsync();
                return await connection.QueryAsync<Ticket>(query);
            }
        }

        public async Task<Ticket?> GetTicketByIdAsync(Guid ticketId)
        {
            var query = "SELECT * FROM Tickets WHERE TicketId = @TicketId";

            using (var connection = new SqlConnection(GetConnectionString(ticketId.ToString())))
            {
                await connection.OpenAsync();
                return await connection.QueryFirstOrDefaultAsync<Ticket>(query, new { TicketId = ticketId });
            }
        }

        public async Task<Ticket?> GetTicketByQrContentAsync(string qrContent)
        {
            var query = "SELECT * FROM Tickets WHERE QRContent = @QRContent";

            using (var connection = new SqlConnection(GetConnectionString(qrContent)))
            {
                await connection.OpenAsync();
                return await connection.QueryFirstOrDefaultAsync<Ticket>(query, new { QRContent = qrContent });
            }
        }

        public async Task UpdateTicketStatusAsync(Guid ticketId, bool isUsed)
        {
            var query = "UPDATE Tickets SET IsUsed = @IsUsed, DateUsed = @DateUsed WHERE TicketId = @TicketId";

            using (var connection = new SqlConnection(GetConnectionString(ticketId.ToString())))
            {
                await connection.OpenAsync();
                await connection.ExecuteAsync(query, new { TicketId = ticketId, IsUsed = isUsed, DateUsed = DateTime.UtcNow });
            }
        }

        public async Task<ICollection<Ticket>> GetTicketsByUser(string userId, TicketFilterDto filter)
        {
            var query = "SELECT * FROM Tickets WHERE UserId = @UserId";
            
            if (filter.EventId != -1)
            {
                query += " AND EventId = @EventId";
            }

            if (filter.IsUsed.HasValue)
            {
                query += " AND IsUsed = @IsUsed";
            }

            using (var connection = new SqlConnection(GetConnectionString(userId)))
            {
                await connection.OpenAsync();
                return (ICollection<Ticket>)await connection.QueryAsync<Ticket>(query, new
                {
                    UserId = userId,
                    EventId = filter.EventId != -1 ? filter.EventId : (object)null,
                    IsUsed = filter.IsUsed
                });
            }
        }
    }