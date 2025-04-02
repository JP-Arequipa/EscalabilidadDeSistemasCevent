using CEventService.API.DAO;
using CEventService.API.Models;

namespace CEventService.API.Services;

public class ActivityService : BaseService<Event, int>, IActivityService
{
    private readonly IEventRepository _repository;

    public ActivityService(IEventRepository repository) : base(repository)
    {
        _repository = repository;
    }

    public async Task<Activity> DeleteActivity(int eventId, int id)
    {
        var eventActivity = await _repository.GetByIdAsync(eventId);
        var activity = eventActivity.Activities.FirstOrDefault(act => act.Id == id);
        eventActivity.Activities.Remove(activity);
        await _repository.UpdateAsync(eventId, eventActivity);
        return activity;
    }

    public async Task<IEnumerable<Activity>> GetActivities(int eventId)
    {
        var eventActivity = await _repository.GetByIdAsync(eventId);
        return eventActivity.Activities;
    }

    public async Task<IEnumerable<Activity>> GetActivitiesByStatus(int eventId, int status)
    {
        var eventActivity = await _repository.GetByIdAsync(eventId);
        return eventActivity.Activities.Where(act => (int)act.Status == status);
    }

    public async Task<Activity> UpdateActivity(int eventId, Activity activity)
    {
        var eventActivity = await _repository.GetByIdAsync(eventId);
        var existingActivity = eventActivity.Activities.FirstOrDefault(act => act.Id == activity.Id);
        existingActivity.Name = activity.Name;
        existingActivity.Description = activity.Description;
        existingActivity.StartTime = activity.StartTime;
        existingActivity.EndTime = activity.EndTime;
        existingActivity.Capacity = activity.Capacity;
        existingActivity.LastStatusUpdate = activity.LastStatusUpdate;
        existingActivity.Status = activity.Status;
        await _repository.UpdateAsync(eventId, eventActivity);
        return existingActivity;
    }

    public async Task<Activity> GetActivity(int eventId, int id)
    {
        var eventActivity = await _repository.GetByIdAsync(eventId);
        var activity = eventActivity.Activities.FirstOrDefault(act => act.Id == id);
        return activity;
    }

    public async Task<Activity> CreateNewActivity(int eventId, Activity activity)
    {
        var eventActivity = await _repository.GetByIdAsync(eventId);
        eventActivity.Activities.Add(activity);
        await _repository.UpdateAsync(eventId,eventActivity);
        return activity;
    }    
}
