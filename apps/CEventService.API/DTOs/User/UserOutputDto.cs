namespace CEventService.API.DTOs.User;
using Models;

public class UserOutputDto : IMapFrom<User>
{
    public required Guid Id { get; set; }
    public required string Name { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
    public required string PhoneNumber { get; set; }
    public string? PhotoUrl { get; set; } 
    public DateTime CreatedAt { get; set; }
}