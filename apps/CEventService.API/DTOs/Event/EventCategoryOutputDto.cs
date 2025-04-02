using CEventService.API.Models;

namespace CEventService.API.DTOs.Event;

public class EventCategoryOutputDto : IMapFrom<EventCategory>
{
    public int Id;
    public string KeyWord { get; set; } = null!;
    public string Color { get; set; } = null!;
    public string Phrase { get; set; } = null!;
}