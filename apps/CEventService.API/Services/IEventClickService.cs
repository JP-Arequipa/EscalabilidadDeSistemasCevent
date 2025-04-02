using CEventService.API.Models;

namespace CEventService.API.Services;

public interface IEventClickService : IBaseService<EventClick, int>
{
    Task<ICollection<Event>> MostClicked(int page, int pageSize);
    Task<ICollection<Event>> MostClicked(int page, int pageSize, string category);
    Task<ICollection<Event>> MostClickedPromoted(int page, int pageSize);
    Task<ICollection<Event>> MostClickedPromoted(int page, int pageSize, string category);
}