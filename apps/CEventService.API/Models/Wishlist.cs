namespace CEventService.API.Models;

public class Wishlist : BaseEntity<int>
{
    public Guid UserId { get; set; } 
    public int EventId { get; set; } 
    
    public User User { get; set; } = null!;
    public Event Event { get; set; } = null!;
}
