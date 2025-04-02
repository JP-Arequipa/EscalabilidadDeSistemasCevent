namespace CEventService.API.Models;

public class Activity : BaseEntity<int>
{
    public int EventId { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public DateTime LastStatusUpdate { get; set; }
    public required EventStatus Status { get; set; }
    public int Capacity { get; set; }

    public Event Event { get; set; }
    public ICollection<Attendance>? Attendances { get; set; }
}