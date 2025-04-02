using CEventService.API.DAO;
using CEventService.API.Models;

namespace CEventService.API.Services;

public class EventClickService : BaseService<EventClick, int>, IEventClickService
{
    private readonly IEventClickRepository _repository;

    public EventClickService(IEventClickRepository repository) : base(repository)
    {
        _repository = repository;
    }
    
    public async Task<ICollection<Event>> MostClicked(int page, int pageSize)
    {
        return await _repository.GetMostClickedEvents(null, page, pageSize);
    }
    public async Task<ICollection<Event>> MostClicked(int page, int pageSize, string category)
    {
        return await _repository.GetMostClickedEvents(ec => ec.Event.Category.KeyWord.ToLower() == category.ToLower(), page, pageSize);
    }
    
    public async Task<ICollection<Event>> MostClickedPromoted(int page, int pageSize)
    {
        return await _repository.GetMostClickedEvents(ec => ec.Event.IsPromoted, page, pageSize);
    }
    public async Task<ICollection<Event>> MostClickedPromoted(int page, int pageSize, string category)
    {
        return await _repository.GetMostClickedEvents(ec => ec.Event.IsPromoted && ec.Event.Category.KeyWord.ToLower() == category.ToLower(), page, pageSize);
    }
}