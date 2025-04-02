using Newtonsoft.Json;

public class Program
{
    public static void Main(string[] args)
    {
        var producer = new RabbitMQProducer();

        var eventMessage = new Event
        {
            EventType = "Technology",
            EventTime = DateTime.Now,
            EventDetails = "An event"
        };

        var message = JsonConvert.SerializeObject(eventMessage);
        producer.SendMessage(message);

        Console.WriteLine("Event published.");
        producer.Dispose();
    }
}
