namespace CEventService.API.Models;

public class User : BaseEntity<Guid>
{
    public required string Name { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
    public required string PhoneNumber { get; set; }
    public string? PhotoUrl { get; set; } 

    public ICollection<Event>? EventsCreated { get; set; }
    public ICollection<Registration>? Registrations { get; set; }
    public ICollection<Event>? CoOrganizedEvents { get; set; }
    public ICollection<Attendance> Attendances { get; set; }
    public ICollection<Wishlist> Wishlists { get; set; }
    public ICollection<EventClick>? EventClicks { get; set; }

    public override string ToString()
    {
        return Name + LastName + " " + Id;
    }
}