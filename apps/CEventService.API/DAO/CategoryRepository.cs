using CEventService.API.Data;
using CEventService.API.Models;

namespace CEventService.API.DAO;

public class CategoryRepository : BaseRepository<EventCategory, int>, ICategoryRepository
{
    public CategoryRepository(AppDbContext context) : base(context)
    {
    }
}