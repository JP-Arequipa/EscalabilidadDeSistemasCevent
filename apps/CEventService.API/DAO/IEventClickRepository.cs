using System.Linq.Expressions;
using CEventService.API.Models;

namespace CEventService.API.DAO;

public interface IEventClickRepository : IBaseRepository<EventClick, int>
{
    Task<ICollection<Event>>
        GetMostClickedEvents(Expression<Func<EventClick, bool>>? predicate, int page, int pageSize);
}