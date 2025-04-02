using DotNetEnv;
using System;

namespace email_poc
{
    public class Program
    {
        static void Main(string[] args)
        {
            Env.Load();

            string apiKey = Environment.GetEnvironmentVariable("SENDINBLUE_API_KEY");

            var emailService = new EmailService(apiKey);
            var email = emailService.CreateEmailContent();
            emailService.SendEmail(email);
        }
    }
}
