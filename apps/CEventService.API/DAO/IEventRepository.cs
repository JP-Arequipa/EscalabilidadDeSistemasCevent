using CEventService.API.DTOs.Event;
using CEventService.API.Models;

namespace CEventService.API.DAO;
public interface IEventRepository : IBaseRepository<Event, int>
{
    Task<IEnumerable<EventHomePageDto>> GetSummaryEvents(int page, int pageSize, EventFilterDto filters);
}