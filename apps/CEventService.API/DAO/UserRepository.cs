using System.Linq.Expressions;
using CEventService.API.Data;
using CEventService.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CEventService.API.DAO;

public class UserRepository : BaseRepository<User, Guid>, IUserRepository
{
    public UserRepository(AppDbContext dbContext) : base(dbContext)
    {
    }
    public async Task<IEnumerable<User>> GetAllEmailsAsync(Expression<Func<User, bool>> predicate)
    {
        return await _dbContext.Set<User>().Where(predicate).ToListAsync();
    }

}