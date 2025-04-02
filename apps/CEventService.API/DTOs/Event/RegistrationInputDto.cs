using CEventService.API.Models;

namespace CEventService.API.DTOs.Event;

public class RegistrationInputDto : IMapFrom<Registration>
{
    public Guid? UserId { get; set; }
    public required string Name { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
    public required string PhoneNumber { get; set; }
    public int EventId { get; set; }
    public required string TicketId { get; set; }

    public override string? ToString()
    {
        return UserId.ToString();
    }
}