using AutoMapper;
using CEventService.API.DTOs.User;
using CEventService.API.Models;
using CEventService.API.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace CEventService.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : BaseController<User, UserOutputDto, UserInputDto, Guid>
{
    private readonly IUserService _userService;
    public UserController(IMapper mapper, IUserService userService)
        : base(mapper, userService)
    {
        _userService = userService;
    }

    public override async Task<ActionResult<UserOutputDto>> Create([FromBody] UserInputDto inputDto)
    {
        var existingUser = await _userService.GetByIdAsync(inputDto.Id);
        if (existingUser is not null)
            return BadRequest("Id already in use");
        return await base.Create(inputDto);
    }

    [HttpPost("GetIdsByEmails")]
    public async Task<IActionResult> GetIdsByEmails([FromBody] IEnumerable<string> emails)
    {
        if (emails == null || !emails.Any())
        {
            return BadRequest("Emails list cannot be empty.");
        }

        var ids = await _userService.GetIdsByEmails(emails);
        return Ok(ids);
    }
}