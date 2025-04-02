using CEventService.API.Data;
using CEventService.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CEventService.API.DAO;

public class RegistrationRepository : BaseRepository<Registration, int>, IRegistrationRepository
{
    public RegistrationRepository(AppDbContext dbContext) : base(dbContext)
    {
    }

    public override Task<Registration> CreateAsync(Registration entity)
    {
        entity.AttendanceStatus = AttendanceStatus.Absent;
        return base.CreateAsync(entity);
    }
    
    public async Task<Registration?> GetByTicketIdAsync(string ticketId)
    {
        return await _dbContext.Set<Registration>()
            .Where(r => r.TicketId == ticketId && !r.IsDeleted)
            .FirstOrDefaultAsync();
    }
    
    public async Task<Registration> UpdateByTicketIdAsync(string ticketId, Registration entity)
    {
        var registration = await _dbContext.Set<Registration>()
            .FirstOrDefaultAsync(r => r.TicketId == ticketId && !r.IsDeleted);

        if (registration == null)
        {
            throw new KeyNotFoundException($"Registration with ticket ID {ticketId} not found.");
        }

        registration.AttendanceStatus = entity.AttendanceStatus;

        _dbContext.Set<Registration>().Update(registration);
        await _dbContext.SaveChangesAsync();
        return registration;
    }

}