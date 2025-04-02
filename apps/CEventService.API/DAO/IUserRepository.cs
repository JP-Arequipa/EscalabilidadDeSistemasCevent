using System.Linq.Expressions;
using CEventService.API.Models;

namespace CEventService.API.DAO;

public interface IUserRepository : IBaseRepository<User, Guid>
{
    Task<IEnumerable<User>> GetAllEmailsAsync(Expression<Func<User, bool>> predicate);
}