using NotificationService.Repositories;

namespace NotificationService.Services;
public class NotififierService : INotificationService
{
    private readonly INotificationRepository _notificationRepository;
    private readonly IEmailService _emailService;
    private readonly ILogger<NotififierService> _logger;

    public NotififierService(
        INotificationRepository notificationRepository,
        IEmailService emailService,
        ILogger<NotififierService> logger)
    {
        _notificationRepository = notificationRepository;
        _emailService = emailService;
        _logger = logger;
    }

    public async Task CreateScheduledNotificationAsync(ScheduledNotification notification)
    {
        await _notificationRepository.CreateAsync(notification);
        _logger.LogInformation($"Scheduled notification created with ID: {notification.Id}");
    }

    public async Task UpdateScheduledNotificationAsync(Guid id, ScheduledNotification updatedNotification)
    {
        var notification = await _notificationRepository.GetByIdAsync(id);
        if (notification == null)
            throw new ArgumentException($"Notification with ID {id} not found.");

        notification.ScheduledTime = updatedNotification.ScheduledTime;
        notification.NotificationBody = updatedNotification.NotificationBody;
        notification.Recipients = updatedNotification.Recipients;

        await _notificationRepository.UpdateAsync(notification);
        _logger.LogInformation($"Scheduled notification with ID {id} updated.");
    }

    public async Task DeleteScheduledNotificationAsync(Guid id)
    {
        var notification = await _notificationRepository.GetByIdAsync(id);
        if (notification == null)
            throw new ArgumentException($"Notification with ID {id} not found.");

        await _notificationRepository.DeleteAsync(notification);
        _logger.LogInformation($"Scheduled notification with ID {id} deleted.");
    }

    public async Task SendScheduledNotificationsAsync()
    {
        var dueNotifications = await _notificationRepository.GetAllDueNotificationsAsync();
        foreach (var notification in dueNotifications)
        {
            var recipients = notification.Recipients.Split(',');
            await _emailService.SendEmailAsync(recipients, "Scheduled Notification", notification.NotificationBody);
            _logger.LogInformation($"Sent scheduled notification to {string.Join(", ", recipients)}");
        }
    }

    public async Task<IEnumerable<ScheduledNotification>> GetAllDueNotificationsAsync()
    {
        return await _notificationRepository.GetAllDueNotificationsAsync();
    }
}