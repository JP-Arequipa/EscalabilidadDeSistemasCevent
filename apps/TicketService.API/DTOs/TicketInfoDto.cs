namespace TicketService.API.DTOs;

public class TicketInfoDto
{
    public Guid TicketId { get; set; }
    public int EventId { get; set; }
    public string UserId { get; set; }
    public string QRContent { get; set; }
    public bool IsUsed { get; set; }
}