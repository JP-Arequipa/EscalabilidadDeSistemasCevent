using System.Collections;
using AutoMapper;
using CEventService.API.DTOs.Event;
using CEventService.API.Models;
using CEventService.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace CEventService.API.Controllers;

[ApiController]
[Route("api/Event/event-clicks")]
public class EventClickController : BaseController<EventClick, EventClickOutputDto, EventClickInputDto, int>
{
    private readonly IEventClickService _eventClickService;

    public EventClickController(IMapper mapper, IEventClickService eventClickService) :
        base(mapper, eventClickService)
    {
        _eventClickService = eventClickService;
    }
}