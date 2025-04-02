
using Microsoft.EntityFrameworkCore;
using NotificationService.Data;

namespace NotificationService.Repositories;
public class NotificationRepository : INotificationRepository
{
    private readonly NotificationDbContext _dbContext;

    public NotificationRepository(NotificationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<ScheduledNotification> GetByIdAsync(Guid id)
    {
        return await _dbContext.ScheduledNotifications.FindAsync(id);
    }

    public async Task CreateAsync(ScheduledNotification notification)
    {
        await _dbContext.ScheduledNotifications.AddAsync(notification);
        await _dbContext.SaveChangesAsync();
    }

    public async Task UpdateAsync(ScheduledNotification notification)
    {
        _dbContext.ScheduledNotifications.Update(notification);
        await _dbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(ScheduledNotification notification)
    {
        _dbContext.ScheduledNotifications.Remove(notification);
        await _dbContext.SaveChangesAsync();
    }

    public async Task<IEnumerable<ScheduledNotification>> GetAllDueNotificationsAsync()
{
    var dueNotifications = await _dbContext.ScheduledNotifications
        .Where(n => n.ScheduledTime <= DateTimeOffset.Now)
        .ToListAsync();
    _dbContext.ScheduledNotifications.RemoveRange(dueNotifications);
    await _dbContext.SaveChangesAsync();

    return dueNotifications;
}
}