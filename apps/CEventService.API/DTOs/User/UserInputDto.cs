namespace CEventService.API.DTOs.User;

public class UserInputDto : IMapFrom<Models.User>
{
    public required Guid Id { get; set; }
    public required string Name { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
    public required string PhoneNumber { get; set; }
    public string? PhotoUrl { get; set; } 
}