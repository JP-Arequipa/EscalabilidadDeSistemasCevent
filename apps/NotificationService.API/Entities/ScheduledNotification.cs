public class ScheduledNotification
{
    public Guid Id { get; set; }
    public DateTimeOffset ScheduledTime { get; set; }
    public string NotificationBody { get; set; }
    public string Recipients { get; set; }
    public bool IsSent {get;set;} = false;
}