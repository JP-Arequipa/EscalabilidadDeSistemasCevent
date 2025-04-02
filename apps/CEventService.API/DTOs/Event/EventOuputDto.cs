using CEventService.API.DTOs.Activity;
using CEventService.API.DTOs.User;

namespace CEventService.API.DTOs.Event;

using Models;
public class EventOutputDto : IMapFrom<Event>
{
    public int Id { get; set; }
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
    public DateTime CreatedAt { get; set; }
    public required string Address { get; set; }
    public int AttendeeCount { get; set; }
    public bool IsPromoted { get; set; }

    public ICollection<ActivityOutputDto>? Activities { get; set; }
    public ICollection<UserOutputDto>? CoOrganizers { get; set; }
    public required EventCategoryOutputDto Category { get; set; }
}