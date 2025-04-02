namespace CEventService.API.DTOs.Activity;

using Models;
public class AttendanceOutputDto : IMapFrom<Attendance>
{
    public int Id { get; set; }
    public required string UserId { get; set; }
    public int ActivityId { get; set; }
    public DateTime AttendanceTime { get; set; } = DateTime.Now;
}
