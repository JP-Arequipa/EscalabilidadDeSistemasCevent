using System.Collections;
using Microsoft.AspNetCore.Mvc;
using TicketService.API.DTOs;
using TicketService.API.Models;
using TicketService.API.Services;

namespace TicketService.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly ITicketService _ticketService;

        public TicketController(ITicketService ticketService)
        {
            _ticketService = ticketService;
        }

        [HttpPost("generate")]
        public async Task<IActionResult> GenerateTicket([FromBody] TicketRequestDto ticketRequest)
        {
            if (ticketRequest == null)
            {
                return BadRequest("Ticket request cannot be null");
            }

            var ticketResponse = await _ticketService.GenerateTicketAsync(ticketRequest);

            if (ticketResponse == null)
            {
                return BadRequest("Error generating ticket");
            }

            return Ok(ticketResponse);
        }

        [HttpPost("validate")]
        public async Task<IActionResult> ValidateTicket([FromBody] string qrContent)
        {
            if (string.IsNullOrEmpty(qrContent))
            {
                return BadRequest("QR content is required");
            }

            var isValid = await _ticketService.ValidateTicketAsync(qrContent);

            if (!isValid)
            {
                return NotFound("Ticket not found or already used");
            }

            return Ok(new { Message = "Ticket validated successfully" });
        }

        [HttpGet("{ticketId}")]
        public async Task<IActionResult> GetTicketById(string ticketId)
        {
            if (string.IsNullOrEmpty(ticketId))
            {
                return BadRequest("Ticket ID is required");
            }

            var ticket = await _ticketService.GetTicketByIdAsync(ticketId);

            if (ticket == null)
            {
                return NotFound("Ticket not found");
            }

            return Ok(ticket);
        }

        [HttpPost("qr")]
        public async Task<IActionResult> GetTicketByQrCode([FromBody] string qrContent)
        {
            if (string.IsNullOrEmpty(qrContent))
            {
                return BadRequest("QR content is required");
            }

            var ticket = await _ticketService.GetTicketByQrCodeAsync(qrContent);

            if (ticket == null)
            {
                return NotFound("Ticket not found");
            }
            
            return Ok(ticket);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTickets()
        {
            try
            {
                var tickets = await _ticketService.GetAllTicketsAsync();

                if (tickets == null || !tickets.Any())
                {
                    return NotFound("No tickets found");
                }

                return Ok(tickets);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<ICollection<TicketInfoDto>>> GetTicketByUserId(
            string userId,
            [FromQuery] TicketFilterDto filterDto
            )
        {
            var tickets = await _ticketService.GetTicketsByUserId(userId, filterDto);
            return tickets is null ? NotFound() : Ok(tickets);
        }

        [HttpPost("generate/{quantity}")]
        public async Task<ActionResult<IEnumerable<TicketInfoDto>>> CreateTickets(int quantity, [FromBody] TicketRequestDto ticketRequest)
        {
            var tickets = await _ticketService.GenerateTicketsAsync(ticketRequest, quantity);
            return tickets is null ? NotFound() : Ok(tickets);

        }
    }
}
