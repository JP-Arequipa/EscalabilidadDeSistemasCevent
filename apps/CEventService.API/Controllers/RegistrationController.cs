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
public class RegistrationController : BaseController<Registration, RegistrationOutputDto, RegistrationInputDto, int>
{
    private readonly IUserService _userService;
    private readonly IRegistrationService _registrationService;

    public RegistrationController(IMapper mapper, IRegistrationService registrationService, IUserService userService) : base(mapper, registrationService)
    {
        _registrationService = registrationService;
        _userService = userService;
    }

    [HttpPost]
    public override async Task<ActionResult<RegistrationOutputDto>> Create([FromBody] RegistrationInputDto inputDto)
    {
        var user = new User()
        {
            Name = inputDto.Name,
            LastName = inputDto.LastName,
            Email = inputDto.Email,
            PhoneNumber = inputDto.PhoneNumber
        };

        var createdUser = await _userService.CreateAsync(user);
        inputDto.UserId = createdUser.Id;
        return await base.Create(inputDto);
    }

    [HttpGet("GetByTicketId/{ticketId}")]
    public async Task<ActionResult<RegistrationOutputDto>> GetByTicketIdAsync(string ticketId)
    {
        var registration = await _registrationService.GetByTicketIdAsync(ticketId);
        if (registration is null)
        {
            return NotFound($"Registration with TicketId '{ticketId}' not found.");
        }

        return Ok(_mapper.Map<RegistrationOutputDto>(registration));
    }
    
    [HttpPost("UpdateStatus/{ticketId}")]
    public async Task<ActionResult> UpdateStatus(string ticketId, [FromBody] UpdateStatusRegistration updateStatusRegistration)
    {
        var registrationUpdate = await _registrationService.UpdateStatus(ticketId, updateStatusRegistration);
        if (registrationUpdate is null)
        {
            return NotFound("Registration not found.");
        }
                
        return Ok(_mapper.Map<RegistrationOutputDto>(registrationUpdate));
    }
}