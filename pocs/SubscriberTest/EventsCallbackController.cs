namespace SubscriberTest;

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/events-callback")]
public class EventsCallbackController : ControllerBase
{
    [HttpPost]
    public IActionResult ReceiveEvent([FromBody] EventWrapper eventWrapper)
    {
        Console.WriteLine(eventWrapper);
        var eventType = eventWrapper.EventType;
        var eventData = eventWrapper.Data;

        Console.WriteLine($"Received event of type: {eventType}");
        Console.WriteLine($"Event Data: {eventData.CustomerName}");

        return Ok("Event received and processed");
    }
}
