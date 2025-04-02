namespace TicketService.API.Models
{
    public class Ticket
    {
        public Guid TicketId { get; set; } = Guid.NewGuid();
        public int EventId { get; set; }
        public string UserId { get; set; } = string.Empty;
        public string QRContent { get; set; } = string.Empty;
        public bool IsUsed { get; set; } = false;
        public DateTime DateIssued { get; set; } = DateTime.UtcNow;
        public DateTime? DateUsed { get; set; }
    }
}