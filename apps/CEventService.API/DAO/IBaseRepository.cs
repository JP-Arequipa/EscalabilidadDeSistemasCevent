using System.Collections;
using System.Linq.Expressions;
using CEventService.API.Models;

namespace CEventService.API.DAO;

public interface IBaseRepository<T, TId> where T : BaseEntity<TId>
{
    Task<IEnumerable<T>> GetAllAsync(int page, int pageSize);
    Task<IEnumerable<T>> GetAllAsync();
    Task<T?> GetByIdAsync(TId id);
    Task<T> CreateAsync(T entity);
    Task<T> UpdateAsync(TId id, T entity);
    Task<int> SoftDeleteAsync(TId id);
    Task<ICollection<T>> GetFilteredPagedAsync(Expression<Func<T, bool>> filter, int page, int pageSize);
    Task<T?> GetFilteredAsync(Expression<Func<T, bool>> filter);
}