using System.Linq.Expressions;
using CEventService.API.DAO;
using CEventService.API.Data;
using CEventService.API.DTOs.Event;
using CEventService.API.Models;
using Microsoft.EntityFrameworkCore;

public class EventRepository : BaseRepository<Event, int>, IEventRepository
{
    public EventRepository(AppDbContext dbContext) : base(dbContext)
    {
    }

    public override async Task<IEnumerable<Event>> GetAllAsync(int page, int pageSize)
    {
        return await _dbContext.Set<Event>()
            .Where(e => !e.IsDeleted)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Include(e => e.Activities)
            .Include(e => e.CoOrganizers)
            .Include(e => e.Category)
            .ToListAsync();
    }

    public override async Task<Event?> GetByIdAsync(int id)
    {
        return await _dbContext.Set<Event>()
            .Include(e => e.Category)
            .Include(e => e.Activities)
            .Include(e => e.CoOrganizers)
            .FirstOrDefaultAsync(e => e.Id == id && !e.IsDeleted);
    }

    public async Task<IEnumerable<EventHomePageDto>> GetSummaryEvents(int page, int pageSize, EventFilterDto filters)
    {
        var query = _dbContext.Set<Event>().AsQueryable();

        if (!string.IsNullOrEmpty(filters.Category))
            query = query.Where(e => e.Category.KeyWord == filters.Category);

        if (filters.StartDate.HasValue)
            query = query.Where(e => e.EventDate >= filters.StartDate.Value);

        if (filters.EndDate.HasValue)
            query = query.Where(e => e.EventDate <= filters.EndDate.Value);

        if (filters.OrganizerUserId.HasValue)
            query = query.Where(e => e.OrganizerUserId == filters.OrganizerUserId.Value);

        if (filters.MinPrice.HasValue)
            query = query.Where(e => e.TicketPrice >= filters.MinPrice.Value);

        if (filters.MaxPrice.HasValue)
            query = query.Where(e => e.TicketPrice <= filters.MaxPrice.Value);

        if (filters.Status != -1 && filters.Status < 6)
            query = query.Where(e => (int)e.Status == filters.Status);

        if (filters.IsPromoted.HasValue)
            query = query.Where(e => e.IsPromoted == filters.IsPromoted.Value);

        if (!string.IsNullOrEmpty(filters.SortBy))
            query = filters.IsDescending
                ? query.OrderByDescending(e => EF.Property<object>(e, filters.SortBy))
                : query.OrderBy(e => EF.Property<object>(e, filters.SortBy));

        query = query.Skip((page - 1) * pageSize).Take(pageSize);

        var events = await query.Select(e => new EventHomePageDto
        {
            Id = e.Id,
            Name = e.Name,
            Category = e.Category.KeyWord,
            EventDate = e.EventDate,
            Address = e.Address,
            TicketPrice = e.TicketPrice,
            AttendeeCount = e.AttendeeCount,
            ShortDescription = e.ShortDescription,
            CoverPhotoUrl = e.CoverPhotoUrl
        }).ToListAsync();

        return events;
    }

    public override async Task<ICollection<Event>> GetFilteredPagedAsync(
        Expression<Func<Event, bool>> filter,
        int page,
        int pageSize)
    {
        return await _dbContext.Set<Event>()
            .Where(filter)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Include(e => e.Category)
            .ToListAsync();
    }

    public override async Task<Event> CreateAsync(Event entity)
{
    entity.CreatedAt = DateTime.Now;
    entity.IsDeleted = false;

    await _dbContext.Set<Event>().AddAsync(entity);

    if (entity.Activities != null && entity.Activities.Any())
    {
        foreach (var activity in entity.Activities)
        {
            activity.CreatedAt = DateTime.Now;
            activity.IsDeleted = false;
            activity.EventId = entity.Id;
        }

        await _dbContext.Set<Activity>().AddRangeAsync(entity.Activities);
    }

    await _dbContext.SaveChangesAsync();

    return entity;
}

}