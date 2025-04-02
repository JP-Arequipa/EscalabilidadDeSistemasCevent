using CEventService.API.DAO;
using CEventService.API.DTOs.Event;
using CEventService.API.Models;
using DTOs.Audit;

namespace CEventService.API.Services;

public class EventService : BaseService<Event, int>, IEventService

{
    private readonly IEventRepository _eventRepository;
    private readonly IEventClickRepository _eventClickRepository;
    public EventService(IEventRepository repository, IEventClickRepository eventClickRepository) : base(repository)
    {
        _eventRepository = repository;
        _eventClickRepository = eventClickRepository;
    }

    public Task<IEnumerable<EventHomePageDto>> GetSummaryEvents(int page, int pageSize, EventFilterDto filters)
    {
        var events = _eventRepository.GetSummaryEvents(page, pageSize, filters);
        return events;
    }

    public async Task<bool> PromoteEvent(int eventId, bool isPromoted)
    {
        var eventSearched = await _eventRepository.GetByIdAsync(eventId);
        if (eventSearched is null) return false;
        eventSearched.IsPromoted = isPromoted;
        var response = await _eventRepository.UpdateAsync(eventId, eventSearched);
        if (response is null) return false;
        var responseCreate = await _eventClickRepository.CreateAsync(new EventClick
        {
            EventId = eventId,
            UserId = response.OrganizerUserId
        });
        
        return true;
    }
    
    public async Task<ICollection<Event>> GetPromotedEvents(int page, int pageSize)
    {
        return await _eventRepository.GetFilteredPagedAsync(
            e => !e.IsDeleted && e.IsPromoted,
            page,
            pageSize
        );
    }
    
    public async Task<ICollection<Event>> GetPromotedEvents(int page, int pageSize, string category)
    {
        return await _eventRepository.GetFilteredPagedAsync(
            e => !e.IsDeleted && e.IsPromoted && e.Category.KeyWord.Equals(category),
            page,
            pageSize
        );
    }

    public async Task<BasicDataCounterDto> GetBasicDataCounter()
    {
        var totalEvents = (await _eventRepository.GetAllAsync()).Count();
        var stadistics = new BasicDataCounterDto
        {
            TotalEvents = totalEvents,
        };
        return stadistics;
    }

    public async Task<Event> UpdateStatus(int eventId, UpdateStatusEventDto updateStatusEventDto)
    {
       var eventEntity = await _eventRepository.GetByIdAsync(eventId);
        if (eventEntity == null)
         
        if (updateStatusEventDto.CategoryId.HasValue)
            eventEntity.CategoryId = updateStatusEventDto.CategoryId.Value;

        if (updateStatusEventDto.Status.HasValue)
            eventEntity.Status = updateStatusEventDto.Status.Value;

        if (updateStatusEventDto.IsPromoted.HasValue)
            eventEntity.IsPromoted = updateStatusEventDto.IsPromoted.Value;

        if (updateStatusEventDto.AttendeeCount.HasValue)
            eventEntity.AttendeeCount = updateStatusEventDto.AttendeeCount.Value;

        await _eventRepository.UpdateAsync(eventEntity.Id, eventEntity);

        return eventEntity;
    }

    public async Task<ICollection<Event>> GetEventsByIds(ICollection<int> eventsIds)
    {
        return await _eventRepository.GetFilteredPagedAsync(e => eventsIds.Contains(e.Id), 1, eventsIds.Count);
    }
}