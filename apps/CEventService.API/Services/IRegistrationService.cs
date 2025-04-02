using CEventService.API.Models;
using CEventService.API.DTOs.Event;

namespace CEventService.API.Services;

public interface IRegistrationService : IBaseService<Registration, int>
{
    Task<Registration?> GetByTicketIdAsync(string ticketId);
    Task<Registration> UpdateStatus(string ticketId, UpdateStatusRegistration updateStatusRegistration);
}