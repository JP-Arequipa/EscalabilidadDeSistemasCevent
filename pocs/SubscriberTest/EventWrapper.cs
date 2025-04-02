using Newtonsoft.Json.Linq;

namespace SubscriberTest;

public class EventWrapper
{
    public string EventType { get; set; }
    public DataClass Data { get; set; }
}

public class DataClass
{
    public string OrderId { get; set; }
    public string CreatedAt { get; set; }
    public string CustomerName { get; set; }
    public decimal TotalAmount { get; set; }
}
