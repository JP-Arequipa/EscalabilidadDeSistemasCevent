namespace NotificationService.Dtos;
public class UpdateNotificationRequest
{
    public List<string> Emails { get; set; }
    public string NotificationBody { get; set; }
}