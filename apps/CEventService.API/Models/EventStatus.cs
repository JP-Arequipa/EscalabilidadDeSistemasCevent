namespace CEventService.API.Models;

public enum EventStatus
{
    Pending = 1,
    Cancelled = 2,
    Postponed = 3,
    InProgress = 4,
    Completed = 5,
    OnHold = 6
}