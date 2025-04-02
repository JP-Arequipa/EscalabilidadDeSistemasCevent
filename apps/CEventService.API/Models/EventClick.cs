namespace CEventService.API.Models;

public class EventClick : BaseEntity<int>
{
    public int EventId { get; set; }
    public Guid? UserId { get; set; }

    public Event Event { get; set; }
    public User? User { get; set; }
}
