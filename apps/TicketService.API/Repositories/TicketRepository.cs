using TicketService.API.Models;
using Microsoft.EntityFrameworkCore;
using TicketService.API.Database;
using TicketService.API.DTOs;

namespace TicketService.API.Repositories
{
    public class TicketRepository : ITicketRepository
    {
        private readonly TicketDbContext _context;

        public TicketRepository(TicketDbContext context)
        {
            _context = context;
        }

        public async Task<Ticket> CreateTicketAsync(Ticket ticket)
        {
            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();
            return ticket;
        }

        public async Task<ICollection<Ticket>> CreateTicketsAsync(ICollection<Ticket> tickets)
        {
            _context.Tickets.AddRange(tickets);
            await _context.SaveChangesAsync();
            return tickets;
        }

        public async Task<IEnumerable<Ticket>> GetAllTicketAsync()
        {
            return await _context.Tickets.ToListAsync();
        }

        public async Task<Ticket?> GetTicketByIdAsync(Guid ticketId)
        {
            return await _context.Tickets.FindAsync(ticketId);
        }
        
        public async Task<Ticket?> GetTicketByQrContentAsync(string qrContent)
        {
            return await _context.Tickets
                .FirstOrDefaultAsync(t => t.QRContent == qrContent);
        }

        public async Task UpdateTicketStatusAsync(Guid ticketId, bool isUsed)
        {
            var ticket = await GetTicketByIdAsync(ticketId);
            if (ticket != null)
            {
                ticket.IsUsed = isUsed;
                await _context.SaveChangesAsync();
            }
        }

        public async Task<ICollection<Ticket>> GetTicketsByUser(string userId, TicketFilterDto filter)
        {
            var query = _context.Tickets
                .Where(t => t.UserId == userId);

            if (filter.EventId != -1 && filter.EventId != null)
                query = query.Where(t => t.EventId == filter.EventId);

            if (filter.IsUsed.HasValue)
                query = query.Where(t => t.IsUsed == filter.IsUsed);
        
            return await query.ToListAsync();
        }
    }
}