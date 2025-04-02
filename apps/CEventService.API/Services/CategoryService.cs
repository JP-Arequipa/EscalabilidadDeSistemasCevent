using CEventService.API.DAO;
using CEventService.API.Models;

namespace CEventService.API.Services;

public class CategoryService : BaseService<EventCategory, int>, ICategoryService
{
    private readonly ICategoryRepository _repository;

    public CategoryService(ICategoryRepository repository) : base(repository)
    {
        _repository = repository;
    }
}