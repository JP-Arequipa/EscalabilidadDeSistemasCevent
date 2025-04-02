using System.Collections;

namespace TicketService.API.Repositories
{
    using TicketService.API.DTOs;
    using TicketService.API.Models;
    
    public interface ITicketRepository
    {
        Task<Ticket> CreateTicketAsync(Ticket ticket);
        Task<ICollection<Ticket>> CreateTicketsAsync(ICollection<Ticket> tickets);
        Task<IEnumerable<Ticket>> GetAllTicketAsync();
        Task<Ticket?> GetTicketByIdAsync(Guid ticketId);
        Task<Ticket?> GetTicketByQrContentAsync(string qrContent);
        Task UpdateTicketStatusAsync(Guid ticketId, bool isUsed);
        Task<ICollection<Ticket>> GetTicketsByUser(string userId, TicketFilterDto filter);
    }
}