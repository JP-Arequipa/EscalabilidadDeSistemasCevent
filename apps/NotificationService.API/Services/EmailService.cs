using NotificationService.Repositories;

namespace NotificationService.Services;
public class EmailService : IEmailService
{
    private readonly IEmailRepository _emailRepository;

    public EmailService(IEmailRepository emailRepository)
    {
        _emailRepository = emailRepository;
    }

    public async Task SendEmailAsync(IEnumerable<string> recipients, string subject, string body)
    {
        foreach (var recipient in recipients)
        {
            await _emailRepository.SendEmailAsync(recipient, subject, body);
        }
    }
}