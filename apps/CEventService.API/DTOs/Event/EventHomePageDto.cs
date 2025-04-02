using AutoMapper;

namespace CEventService.API.DTOs.Event;
using Models;

public class EventHomePageDto : IMapFrom<Event>
{
    public int Id { get; set; }           
    public required string Name { get; set; }           
    public required string Category { get; set; }       
    public DateTime EventDate { get; set; }    
    public required string Address { get; set; }       
    public decimal TicketPrice { get; set; }   
    public int AttendeeCount { get; set; }     
    public required string ShortDescription { get; set; }    
    public required string CoverPhotoUrl { get; set; } 
    
    public void Mapping(Profile profile)
    {
        profile.CreateMap<Event, EventHomePageDto>()
            .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category.KeyWord));
    }
}
