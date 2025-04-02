namespace TicketService.API.DTOs
{
    public class TicketResponseDto
    {
        public string TicketId { get; set; } = string.Empty;
        public string QRContent { get; set; } = string.Empty;
        public int EventId { get; set; }
        public bool IsUsed { get; set; }
    }
}
