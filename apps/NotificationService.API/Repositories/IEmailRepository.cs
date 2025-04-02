namespace NotificationService.Repositories;
public interface IEmailRepository
{
    Task SendEmailAsync(string reciepient, string subject, string body);
}