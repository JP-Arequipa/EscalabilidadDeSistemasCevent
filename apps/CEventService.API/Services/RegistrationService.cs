using CEventService.API.DAO;
using CEventService.API.Models;
using CEventService.API.DTOs.Event;

namespace CEventService.API.Services;

public class RegistrationService : BaseService<Registration, int>, IRegistrationService
{
    private readonly IRegistrationRepository _registrationRepository;

    public RegistrationService(IRegistrationRepository registrationRepository) : base(registrationRepository)
    {
        _registrationRepository = registrationRepository;
    }

    public async Task<Registration?> GetByTicketIdAsync(string ticketId)
    {
        return await _registrationRepository.GetByTicketIdAsync(ticketId);
    }

    public async Task<Registration> UpdateStatus(string ticketId, UpdateStatusRegistration updateStatusRegistration)
    {
        var registrationEntity = await _registrationRepository.GetByTicketIdAsync(ticketId);

        if (registrationEntity == null)
        {
            throw new KeyNotFoundException($"Registration with ticket ID {ticketId} not found.");
        }

        registrationEntity.AttendanceStatus = updateStatusRegistration.AttendanceStatus;

        return await _registrationRepository.UpdateByTicketIdAsync(ticketId, registrationEntity);
    }


}