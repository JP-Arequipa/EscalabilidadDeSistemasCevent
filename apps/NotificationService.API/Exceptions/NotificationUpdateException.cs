namespace NotificationService.Exceptions;
public class NotificationUpdateException : ValidationException
{
    public NotificationUpdateException(string details) : base("Unable to update the schedule notification", details)
    {
    }
}