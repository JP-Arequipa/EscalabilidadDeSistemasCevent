namespace CEventService.API.Models;

public class Attendance : BaseEntity<int>
{
    public required Guid UserId { get; set; }
    public int ActivityId { get; set; }

    public User User { get; set; }
    public Activity Activity { get; set; }
}