using CEventService.API.Models;

namespace CEventService.API.DTOs.Event;
public class EventFilterDto
{
    public string? Category { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public decimal? MinPrice { get; set; }
    public decimal? MaxPrice { get; set; }
    public int Status { get; set; } = -1;
    public string? SortBy { get; set; } 
    public bool? IsPromoted { get; set; }
    public Guid? OrganizerUserId { get; set; }
    public bool IsDescending { get; set; } = false; 
}
