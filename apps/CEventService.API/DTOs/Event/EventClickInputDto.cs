using CEventService.API.Models;

namespace CEventService.API.DTOs.Event;

public class EventClickInputDto : IMapFrom<EventClick>
{
    public int EventId { get; set; }
    public Guid UserId { get; set; }
}