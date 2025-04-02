# Transactional Email Sending with Sendinblue using C#

This project demonstrates how to send a transactional email using the Sendinblue SDK (`sib_api_v3_sdk`) in a C# console application. The code shows how to configure the sender, recipients, email content, attachments, and handle dynamic variables.

## Requirements

- **Sendinblue API Key**: You need to obtain your API key from your Sendinblue account.
- **.env file**: A `.env` file is required to store your Sendinblue API key with the name **SENDINBLUE_API_KEY=** YOUR_API_KEY
 
- **Sendinblue SDK (`sib_api_v3_sdk`)**: This should be installed as a dependency in your project. You can install it with NuGet:
  ```bash
  Install-Package sib_api_v3_sdk
  ```

## Code Overview

The code follows these steps to send a transactional email:

### 1. **API Key Configuration**

Load the API key from the `.env` file to authenticate requests to the Sendinblue API:
```csharp
Env.Load();
string apiKey = Environment.GetEnvironmentVariable("SENDINBLUE_API_KEY");
```

### 2. **Creating an Instance of the Transactional Emails API**

An instance of the API is created to interact with Sendinblue:
```csharp
var apiInstance = new TransactionalEmailsApi();
```

### 3. **Sender Definition**

Specify the sender of the email:
```csharp
var sender = new SendSmtpEmailSender("SenderName", "sender@example.com");
```

### 4. **Defining Recipients (To), BCC, and CC**

Define the recipients, including CC (carbon copy) and BCC (blind carbon copy):
```csharp
var recipient = new SendSmtpEmailTo("recipient@example.com", "RecipientName");
var bcc = new SendSmtpEmailBcc("bcc@example.com", "BccName");
var cc = new SendSmtpEmailCc("cc@example.com", "CcName");
```

### 5. **Email Content**

Define the HTML content of the email and the subject. Dynamic variables can be used:
```csharp
string htmlContent = "<html><body><h1>This is my first transactional email {{params.parameter}}</h1></body></html>";
string subject = "Email Subject {{params.subject}}";
```

### 6. **Reply-To Configuration**

Set the reply-to address where recipients should send their replies:
```csharp
var replyTo = new SendSmtpEmailReplyTo("replyto@domain.com", "ReplyToName");
```

### 7. **Attachments**

Attach files to the email in Base64 format:
```csharp
var attachment = new SendSmtpEmailAttachment(null, System.Convert.FromBase64String("aGVsbG8gdGhpcyBpcyB0ZXN0"), "test.txt");
```

### 8. **Dynamic Variables and Custom Headers**

Pass dynamic variables to customize the email content and add custom headers:
```csharp
JObject parameters = new JObject();
parameters.Add("parameter", "Custom Value");
parameters.Add("subject", "New Subject");

JObject headers = new JObject();
headers.Add("Some-Custom-Name", "unique-id-1234");
```

### 9. **Sending the Email**

Build the `SendSmtpEmail` object and call the `SendTransacEmail` method to send the email:
```csharp
var sendSmtpEmail = new SendSmtpEmail(sender, new List<SendSmtpEmailTo> { recipient }, new List<SendSmtpEmailBcc> { bcc }, new List<SendSmtpEmailCc> { cc }, htmlContent, null, subject, replyTo, new List<SendSmtpEmailAttachment> { attachment }, headers, null, parameters, null, new List<string> { "mytag" });

CreateSmtpEmail result = apiInstance.SendTransacEmail(sendSmtpEmail);
Console.WriteLine(result.ToJson());
```

### 10. **Error Handling**

If an error occurs, the exception message is captured and printed:
```csharp
catch (Exception e)
{
    Console.WriteLine(e.Message);
}
```
