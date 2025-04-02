namespace TicketService.API.DTOs;
public class TicketFilterDto
{
    public int EventId { get; set; } =  -1;
    public bool? IsUsed { get; set; }
}
