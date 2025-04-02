namespace NotificationService.Dtos;
public class ScheduleNotificationRequest
{
    public DateOnly Date { get; set; }
    public TimeOnly Hour { get; set; }
    public List<string> Emails { get; set; }
    public string NotificationBody { get; set; }
}