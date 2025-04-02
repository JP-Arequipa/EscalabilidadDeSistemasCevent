using Newtonsoft.Json;

public class Program
{
    public static void Main(string[] args)
    {
        var consumer = new RabbitMQConsumer();

        consumer.StartConsuming(ProcessEvent);

        Console.WriteLine("Press [enter] to exit.");
        Console.ReadLine();

        consumer.Dispose();
    }

    private static void ProcessEvent(string message)
    {
        var eventMessage = JsonConvert.DeserializeObject<Event>(message);
        Console.WriteLine($"Received Event: {eventMessage.EventType} at {eventMessage.EventTime}. Details: {eventMessage.EventDetails}");
    }
}
