using CEventService.API.Models;

namespace CEventService.API.DTOs.Event;

public class UpdateStatusEventDto
{
    public int? CategoryId { get; set; }
    public EventStatus? Status { get; set; }
    public bool? IsPromoted { get; set; }
    public int? AttendeeCount { get; set; }

}