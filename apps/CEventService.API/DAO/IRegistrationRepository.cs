using CEventService.API.Models;

namespace CEventService.API.DAO;

public interface IRegistrationRepository : IBaseRepository<Registration, int>
{
    Task<Registration?> GetByTicketIdAsync(string ticketId);
    Task<Registration> UpdateByTicketIdAsync(string ticketId, Registration entity);
}