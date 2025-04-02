using CEventService.API.DAO;
using CEventService.API.Models;

namespace CEventService.API.Services;

public class UserService : BaseService<User, Guid>, IUserService
{
    private readonly IUserRepository _repository;

    public UserService(IUserRepository repository) : base(repository)
    {
        _repository = repository;
    }

    public override async Task<User> CreateAsync(User entity)
    {
        var existingUser = await GetUserByEmail(entity.Email);
        if (existingUser != null && existingUser.Id != default)
        {
            entity.Id = existingUser.Id;
            return await base.UpdateAsync(existingUser.Id, entity);
        }
        return await base.CreateAsync(entity);
    }

    public async Task<User?> GetUserByEmail(string email)
    {
        return await _repository.GetFilteredAsync(u => u.Email.Equals(email));
    }
    public async Task<IEnumerable<Guid>> GetIdsByEmails(IEnumerable<string> emails)
    {
        var users = await _repository.GetAllEmailsAsync(u => emails.Contains(u.Email));
        return users.Select(u => u.Id);
    }
}