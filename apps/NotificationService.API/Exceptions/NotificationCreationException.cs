namespace NotificationService.Exceptions;
public class NotificationCreationException : ValidationException
{
    public NotificationCreationException(string details) : base("Unable to create an schedule notification", details)
    {
    }
}