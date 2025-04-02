using AutoMapper;
using CEventService.API.DTOs.Event;
using CEventService.API.Models;
using CEventService.API.Services;
using DTOs.Audit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace CEventService.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventController : BaseController<Event, EventOutputDto, EventInputDto, int>
{
    private readonly IEventService _eventService;
    private readonly IEventClickService _eventClickService;


    public EventController(IMapper mapper, IEventService eventService, IEventClickService eventClickService)
        : base(mapper, eventService)
    {
        _eventService = eventService;
        _eventClickService = eventClickService;
    }

    [HttpGet("summaryEvent")]
    public async Task<ActionResult<IEnumerable<EventHomePageDto>>> GetEventsForHomePage(
        [FromQuery] EventFilterDto filters,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        var events = await _eventService.GetSummaryEvents(page, pageSize, filters);
        return Ok(events);
    }

    [HttpPost]
    public override async Task<ActionResult<EventOutputDto>> Create([FromBody] EventInputDto inputDto)
    {
        return await base.Create(inputDto);
    }

    [HttpPut("{id}")]
    public override async Task<ActionResult> Update(int id, [FromBody] EventInputDto inputDto, [FromHeader] Guid userId)
    {
        var validationResult = await ValidateEventOwnershipAsync(id, userId);
        if (validationResult is not null) return validationResult;

        return await base.Update(id, inputDto, userId);
    }

    [HttpDelete("{id}")]
    public override async Task<IActionResult> SoftDelete(int id, [FromHeader] Guid userId)
    {
        var validationResult = await ValidateEventOwnershipAsync(id, userId);
        if (validationResult is not null) return validationResult;

        return await base.SoftDelete(id, userId);
    }

    [HttpPost("PromotionEvent")]
    public async Task<ActionResult> PromoteEvent([FromBody] PromoteEventDto promoteEventDto)
    {
        var result = await _eventService.PromoteEvent(promoteEventDto.EventId, promoteEventDto.IsPromoted);
        if (result)
        {
            return Ok("Event promotion status updated successfully.");
        }
        else
        {
            return StatusCode(500, "An error occurred while updating the event promotion status.");
        }
    }

    private async Task<ActionResult?> ValidateEventOwnershipAsync(int eventId, Guid userId)
    {
        var eventEntity = await _eventService.GetByIdAsync(eventId);
        if (eventEntity == null)
            return NotFound("Event not found.");

        if (userId != eventEntity.OrganizerUserId)
            return Unauthorized("You are not authorized to perform this action.");

        return null;
    }

    [HttpGet("banner")]
    public async Task<ActionResult<IEnumerable<EventHomePageDto>>> GetPromotedAndMostClickedEvents(int page = 1, int pageSize = 10)
    {
        var response = await GetPromotedEventsAsync(page, pageSize);
        if (response.IsNullOrEmpty())
        {
            var filters = new EventFilterDto()
            {
                SortBy = "EventDate",
                IsDescending = true
            };
            response = await _eventService.GetSummaryEvents(page, pageSize, filters);
        }
        return Ok(response);
    }

    [HttpGet("banner/{category}")]
    public async Task<ActionResult<IEnumerable<EventHomePageDto>>> GetPromotedAndMostClickedEventsByCategory(string category, int page = 1, int pageSize = 10)
    {
        var response = await GetPromotedEventsAsync(page, pageSize, category);
        if (response.IsNullOrEmpty())
        {
            var filters = new EventFilterDto()
            {
                SortBy = "EventDate",
                IsDescending = true,
                Category = category
            };
            response = await _eventService.GetSummaryEvents(page, pageSize, filters);
        }

        return Ok(response);
    }

    [HttpGet("audit/eventStadistics")]
    public async Task<ActionResult<BasicDataCounterDto>> GetBasicCounterData()
    {
        var response = await _eventService.GetBasicDataCounter();
        if (response is null)
        {
            return NotFound("No statistics found.");
        }
        return Ok(response);
    }

    [HttpPost("UpdateStatus/{id}")]
    public async Task<ActionResult> UpdateStatus(int id, [FromBody] UpdateStatusEventDto updateStatusEventDto)
    {
        var eventUpdated = await _eventService.UpdateStatus(id, updateStatusEventDto);
        if (eventUpdated is null)
        {
            return NotFound("Event not found.");
        }
        return Ok(_mapper.Map<EventOutputDto>(eventUpdated));
    }

    private async Task<IEnumerable<EventHomePageDto>> GetPromotedEventsAsync(int page, int pageSize, string category = null)
    {
        var promotedEvents = category == null
            ? (await _eventClickService.MostClickedPromoted(page, pageSize)).ToList()
            : (await _eventClickService.MostClickedPromoted(page, pageSize, category)).ToList();

        if (promotedEvents.Count < pageSize)
        {
            var mostClicked = category == null
                ? (await _eventClickService.MostClicked(page, pageSize)).ToList()
                : (await _eventClickService.MostClicked(page, pageSize, category)).ToList();
            var mostClickedWithoutDuplicates = mostClicked.Where(mc => promotedEvents.All(pe => pe.Id != mc.Id));
            promotedEvents.AddRange(mostClickedWithoutDuplicates);
        }

        return _mapper.Map<IEnumerable<EventHomePageDto>>(promotedEvents);
    }

    [HttpPost("by-ids")]
    public async Task<ActionResult<ICollection<EventHomePageDto>>> GetEventsByIds([FromBody] int[] ids)
    {
        var response = await _eventService.GetEventsByIds(ids);
        return response is not null ? Ok(_mapper.Map<ICollection<EventHomePageDto>>(response)) : BadRequest();
    }


}