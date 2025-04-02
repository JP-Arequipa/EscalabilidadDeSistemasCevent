using AutoMapper;
using CEventService.API.DTOs.Activity;
using CEventService.API.DTOs.User;

namespace CEventService.API.DTOs.Event;
using Models;

public class EventInputDto : IMapFrom<Event>
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
    public DateTime CreatedAt { get; set; }
    public required string Address { get; set; }
    public int AttendeeCount { get; set; }

    public ICollection<ActivityInputDto>? Activities { get; set; }
    public ICollection<Guid>? CoOrganizers { get; set; }
    
    public void Mapping(Profile profile)
    {
        profile.CreateMap<EventInputDto, Event>()
                .ForMember(dest => dest.CoOrganizers, opt => opt.MapFrom<CoOrganizersResolver>());
    }
}