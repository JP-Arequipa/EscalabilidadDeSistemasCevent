namespace SubscriberTest;

using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

public class SubscriptionService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<SubscriptionService> _logger;

    public SubscriptionService(IConfiguration configuration, ILogger<SubscriptionService> logger)
    {
        _configuration = configuration;
        _logger = logger;
    }

    public async Task SubscribeToEventBusAsync()
    {
        var eventBusUrl = _configuration["EventBusUrl"];
        var callbackUrl = _configuration["CallbackUrl"];
        var eventType = "OrderCreated";

        var subscribeEndpoint = $"{eventBusUrl}/api/events/subscribe?eventType={eventType}";

        using var client = new HttpClient();
        var content = new StringContent(JsonConvert.SerializeObject(callbackUrl), Encoding.UTF8, "application/json");

        try
        {
            var response = await client.PostAsync(subscribeEndpoint, content);
            if (response.IsSuccessStatusCode)
            {
                Console.WriteLine(eventType);
            }
            else
            {
                Console.WriteLine("error");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
    }
}
