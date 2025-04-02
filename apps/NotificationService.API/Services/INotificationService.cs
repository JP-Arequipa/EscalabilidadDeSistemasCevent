namespace NotificationService.Services;
public interface INotificationService
{
    Task<IEnumerable<ScheduledNotification>> GetAllDueNotificationsAsync();
    Task CreateScheduledNotificationAsync(ScheduledNotification notification);
    Task UpdateScheduledNotificationAsync(Guid id, ScheduledNotification updatedNotification);
    Task DeleteScheduledNotificationAsync(Guid id);
    Task SendScheduledNotificationsAsync();
}