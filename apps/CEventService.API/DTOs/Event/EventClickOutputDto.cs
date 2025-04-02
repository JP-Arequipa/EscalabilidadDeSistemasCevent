using CEventService.API.Models;

namespace CEventService.API.DTOs.Event;

public class EventClickOutputDto : IMapFrom<EventClick>
{
    public int Id { get; set; }
    public int EventId { get; set; }
    public Guid UserId { get; set; }
}