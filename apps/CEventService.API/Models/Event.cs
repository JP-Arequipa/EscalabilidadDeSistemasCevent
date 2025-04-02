namespace CEventService.API.Models;

public class Event : BaseEntity<int>
{
    public required string Name { get; set; }
    public required string ShortDescription { get; set; }
    public required string Description { get; set; }
    public int CategoryId { get; set; }
    public DateTime EventDate { get; set; }
    public Location Location { get; set; } = null!;
    public required string Venue { get; set; }
    public decimal TicketPrice { get; set; }
    public required string CoverPhotoUrl { get; set; }
    public bool AttendanceTrackingEnabled { get; set; }
    public required EventStatus Status { get; set; }
    public int Capacity { get; set; }
    public required Guid OrganizerUserId { get; set; }
    public required string Address { get; set; }
    public int AttendeeCount { get; set; }
    public bool IsPromoted { get; set; }

    public ICollection<Activity>? Activities { get; set; }
    public ICollection<User>? CoOrganizers { get; set; }
    public ICollection<Registration>? Registrations { get; set; }
    public ICollection<Wishlist>? Wishlists { get; set; }
    public required User User { get; set; }
    public required EventCategory Category { get; set; }
    
    public ICollection<EventClick>? EventClicks { get; set; }
}