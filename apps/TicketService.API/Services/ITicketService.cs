using TicketService.API.DTOs;
using TicketService.API.Models;

namespace TicketService.API.Services;

public interface ITicketService
{
    Task<TicketResponseDto> GenerateTicketAsync(TicketRequestDto ticketRequest);
    Task<IEnumerable<TicketResponseDto>> GenerateTicketsAsync(TicketRequestDto ticketRequest, int quantity);
    Task<IEnumerable<TicketRequestDto>> GetAllTicketsAsync();
    Task<bool> ValidateTicketAsync(string ticketId);
    Task<Ticket?> GetTicketByIdAsync(string ticketId);
    Task<TicketResponseQrDtop?> GetTicketByQrCodeAsync(string qrContent);
    Task<ICollection<TicketInfoDto>> GetTicketsByUserId(string userId, TicketFilterDto filterDto);
}