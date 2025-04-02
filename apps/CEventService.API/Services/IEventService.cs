using CEventService.API.DTOs.Event;
using CEventService.API.Models;
using DTOs.Audit;

namespace CEventService.API.Services;
public interface IEventService : IBaseService<Event, int>
{
    Task<IEnumerable<EventHomePageDto>> GetSummaryEvents(int page, int pageSize, EventFilterDto filters);
    Task<bool> PromoteEvent(int eventId, bool isPromoted);
    Task<BasicDataCounterDto> GetBasicDataCounter();
    Task<ICollection<Event>> GetPromotedEvents(int page, int pageSize);
    Task<ICollection<Event>> GetPromotedEvents(int page, int pageSize, string category);
    Task<Event> UpdateStatus(int eventId, UpdateStatusEventDto updateStatusEventDto);
    Task<ICollection<Event>> GetEventsByIds(ICollection<int> eventsIds);
}