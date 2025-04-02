using AutoMapper;
using CEventService.API.Models;
using CEventService.API.DTOs.Activity;
using CEventService.API.Services;
using Microsoft.AspNetCore.Mvc;
namespace CEventService.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AttendanceController : BaseController<Attendance, AttendanceOutputDto, AttendanceInputDto, int>
{    
    public AttendanceController(IMapper mapper, IAttendanceService attendanceService)
        : base(mapper, attendanceService)
    {        
    }
}
