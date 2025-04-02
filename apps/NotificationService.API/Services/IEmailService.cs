using NotificationService.Dtos;

namespace NotificationService.Services;
public interface IEmailService
{
    Task SendEmailAsync(IEnumerable<string> recipients, string subject, string body);

}