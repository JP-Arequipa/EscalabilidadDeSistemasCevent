using CEventService.API.Models;

namespace CEventService.API.Services;

public interface IActivityService : IBaseService<Event, int>
{
    Task<IEnumerable<Activity>> GetActivities(int eventId);
    Task<IEnumerable<Activity>> GetActivitiesByStatus(int eventId, int status);
    Task<Activity> GetActivity(int eventId, int id);
    Task<Activity> UpdateActivity(int eventId, Activity activity);
    Task<Activity> DeleteActivity(int eventId, int id);
    Task<Activity> CreateNewActivity(int eventId, Activity activity);
}