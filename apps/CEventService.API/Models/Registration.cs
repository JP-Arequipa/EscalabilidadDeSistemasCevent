namespace CEventService.API.Models;

public class Registration : BaseEntity<int>
{
    public required Guid UserId { get; set; }
    public int EventId { get; set; }
    public required AttendanceStatus AttendanceStatus { get; set; }
    public DateTime? AttendedAt { get; set; }
    public required string TicketId { get; set; }

    public Event Event { get; set; }
    public User User { get; set; }
}