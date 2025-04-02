namespace CEventService.API.Models;

public class EventCategory : BaseEntity<int>
{
    public string KeyWord { get; set; } = null!;
    public string Color { get; set; } = null!;
    public string Phrase { get; set; } = null!;
    
    public ICollection<Event>? Events { get; set; }
}