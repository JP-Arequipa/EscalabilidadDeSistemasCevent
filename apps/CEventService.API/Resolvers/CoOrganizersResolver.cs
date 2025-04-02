using AutoMapper;
using CEventService.API.Data;

namespace CEventService.API.DTOs.Event;

public class CoOrganizersResolver : IValueResolver<EventInputDto, Models.Event, ICollection<Models.User>>
{
    private readonly AppDbContext _dbContext;

    public CoOrganizersResolver(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public ICollection<Models.User> Resolve(EventInputDto source, Models.Event destination,
        ICollection<Models.User> destMember, ResolutionContext context)
    {
        var users = _dbContext.Set<Models.User>()
            .Where(u => source.CoOrganizers.Contains(u.Id))
            .ToList();
        return users;
    }
}