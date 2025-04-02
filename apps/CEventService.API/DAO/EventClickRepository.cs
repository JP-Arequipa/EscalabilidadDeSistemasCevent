using System.Linq.Expressions;
using CEventService.API.Data;
using CEventService.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;

namespace CEventService.API.DAO;

public class EventClickRepository : BaseRepository<EventClick, int>, IEventClickRepository
{
    public EventClickRepository(AppDbContext dbContext) : base(dbContext)
    {
    }

    public async Task<ICollection<Event>> GetMostClickedEvents(Expression<Func<EventClick, bool>>? predicate, int page, int pageSize)
    {
        IQueryable<Event> allEventsQuery = _dbContext.Set<Event>()
            .Include(e => e.Category); 

        if (predicate != null)
        {
            var filteredEventIds = await _dbContext.Set<EventClick>()
                .Where(predicate)
                .Select(ec => ec.EventId)
                .Distinct()
                .ToListAsync();

            allEventsQuery = allEventsQuery.Where(e => filteredEventIds.Contains(e.Id));
        }

        var clickCountsQuery = _dbContext.Set<EventClick>()
            .Where(predicate ?? (_ => true))
            .GroupBy(ec => ec.EventId)
            .Select(group => new
            {
                EventId = group.Key,
                ClickCount = group.Count()
            });

        var clickCounts = await clickCountsQuery.ToListAsync();

        var allEvents = await allEventsQuery.ToListAsync();
        var eventWithClickCounts = allEvents
            .GroupJoin(
                clickCounts,
                e => e.Id,
                cc => cc.EventId,
                (e, clickGroup) => new
                {
                    Event = e,
                    ClickCount = clickGroup.FirstOrDefault()?.ClickCount ?? 0
                }
            )
            .OrderByDescending(e => e.ClickCount)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(e => e.Event)
            .ToList();

        return eventWithClickCounts;
    }
}