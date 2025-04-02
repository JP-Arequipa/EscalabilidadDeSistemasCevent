using CEventService.API.Models;

namespace CEventService.API.DTOs.Event;

public class UpdateStatusRegistration 
{
    public required AttendanceStatus AttendanceStatus { get; set; }
}