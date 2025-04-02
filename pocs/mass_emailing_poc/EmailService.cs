namespace email_poc;
using sib_api_v3_sdk.Api;
using sib_api_v3_sdk.Client;
using sib_api_v3_sdk.Model;
using System;
using System.Diagnostics;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;

public class EmailService
    {
        private readonly TransactionalEmailsApi _apiInstance;
        private const string EmailSender = "castro.huanca.elvis@gmail.com";

        public EmailService(string apiKey)
        {
            _apiInstance = CreateApiClient(apiKey);
        }

        private TransactionalEmailsApi CreateApiClient(string apiKey)
        {
            Configuration.Default.ApiKey.Add("api-key", apiKey);
            return new TransactionalEmailsApi();
        }

        public SendSmtpEmail CreateEmailContent()
        {
            var sender = new SendSmtpEmailSender("Elvis", EmailSender);
            var recipients = CreateRecipients();
            var bcc = CreateBcc();
            var cc = CreateCc();

            var htmlContent = "<html><body><h1>This is my first transactional email {{params.parameter}}</h1></body></html>";
            var subject = "Prueba";
            var replyTo = new SendSmtpEmailReplyTo("replyto@domain.com", "John Doe");
            var attachments = CreateAttachments();
            var headers = CreateHeaders();
            var parameters = CreateParameters();
            var messageVersions = CreateMessageVersions(recipients, bcc, cc, subject, replyTo);

            return new SendSmtpEmail(sender, recipients, bcc, cc, htmlContent, null, subject, replyTo, attachments, headers, null, parameters, messageVersions, new List<string> { "mytag" });
        }

        private List<SendSmtpEmailTo> CreateRecipients()
        {
            var recipient = new SendSmtpEmailTo("75976822.sucre@gmail.com", "Elvis 2");
            return new List<SendSmtpEmailTo> { recipient };
        }

        private List<SendSmtpEmailBcc> CreateBcc()
        {
            var bcc = new SendSmtpEmailBcc("example2@example2.com", "Janice Doe");
            return new List<SendSmtpEmailBcc> { bcc };
        }

        private List<SendSmtpEmailCc> CreateCc()
        {
            var cc = new SendSmtpEmailCc("example3@example2.com", "John Doe");
            return new List<SendSmtpEmailCc> { cc };
        }

        private List<SendSmtpEmailAttachment> CreateAttachments()
        {
            var content = Convert.FromBase64String("aGVsbG8gdGhpcyBpcyB0ZXN0");
            var attachment = new SendSmtpEmailAttachment(null, content, "test.txt");
            return new List<SendSmtpEmailAttachment> { attachment };
        }

        private JObject CreateHeaders()
        {
            var headers = new JObject();
            headers.Add("Some-Custom-Name", "unique-id-1234");
            return headers;
        }

        private JObject CreateParameters()
        {
            var parameters = new JObject();
            parameters.Add("parameter", "My param value");
            parameters.Add("subject", "New Subject");
            return parameters;
        }

        private List<SendSmtpEmailMessageVersions> CreateMessageVersions(
            List<SendSmtpEmailTo> recipients,
            List<SendSmtpEmailBcc> bcc,
            List<SendSmtpEmailCc> cc,
            string subject,
            SendSmtpEmailReplyTo replyTo)
        {
            var to1 = new SendSmtpEmailTo1(recipients[0].Email, recipients[0].Name);
            var parameters = new Dictionary<string, object> { { "params", CreateParameters() } };
            var messageVersion = new SendSmtpEmailMessageVersions(new List<SendSmtpEmailTo1> { to1 }, parameters, bcc, cc, new SendSmtpEmailReplyTo1(replyTo.Email, replyTo.Name), subject);
            return new List<SendSmtpEmailMessageVersions> { messageVersion };
        }

        public void SendEmail(SendSmtpEmail email)
        {
            try
            {
                var result = _apiInstance.SendTransacEmail(email);
                Debug.WriteLine(result.ToJson());
                Console.WriteLine(result.ToJson());
            }
            catch (Exception e)
            {
                Debug.WriteLine(e.Message);
                Console.WriteLine(e.Message);
            }
        }
    }