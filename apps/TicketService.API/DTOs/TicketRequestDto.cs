namespace TicketService.API.DTOs
{
    public class TicketRequestDto
    {
        public int EventId { get; set; }
        public string UserId { get; set; } = string.Empty;
    }
}