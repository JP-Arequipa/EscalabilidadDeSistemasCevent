namespace NotificationService.Exceptions;
public class ValidationException: Exception
{
    public override string Message {get;}
    public string Details {get;}
    public ValidationException(string message, string details)
    {
        Message =  message;
        Details = details;
    }
}