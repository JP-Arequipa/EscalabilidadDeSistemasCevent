using NotificationService.Dtos;

namespace NotificationService.Repositories;
public interface INotificationRepository
{    
    Task<IEnumerable<ScheduledNotification>> GetAllDueNotificationsAsync();
    Task<ScheduledNotification> GetByIdAsync(Guid id);
    Task CreateAsync(ScheduledNotification notification);
    Task UpdateAsync(ScheduledNotification notification);
    Task DeleteAsync(ScheduledNotification notification);
}