using dotenv.net;
using dotenv.net.Utilities;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace NotificationService.Repositories;    
public class EmailRepository : IEmailRepository
{
    public EmailRepository()
    {
        DotEnv.Load();
    }
    public async Task SendEmailAsync(string recipient, string subject, string body)
    {
        var appMailPassword = EnvReader.GetStringValue("APP_MAIL_PASSWORD");
        var appMailEmail = EnvReader.GetStringValue("APP_MAIL_EMAIL");
        var appMailName = EnvReader.GetStringValue("APP_MAIL_NAME");

        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(appMailName, appMailEmail));
        message.To.Add(new MailboxAddress("", recipient));
        message.Subject = subject;

        var bodyBuilder = new BodyBuilder();
        bodyBuilder.HtmlBody = body;
        message.Body = bodyBuilder.ToMessageBody();

        using (var client = new SmtpClient())
        {
            await client.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(appMailEmail, appMailPassword);
            await client.SendAsync(message);;
            await client.DisconnectAsync(true);
        }
    }
}