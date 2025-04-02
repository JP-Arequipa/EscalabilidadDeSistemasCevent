using System.Text.RegularExpressions;
using NotificationService.Dtos;
using NotificationService.Exceptions;

namespace NotificationService.Validations;
public class ScheduledNotificationValidation : INotifcationValidation
{
    public void ValidateNotificationCreateRequest(ScheduleNotificationRequest schedule)
    {
        var scheduleDate = schedule.Date.ToDateTime(schedule.Hour);
        if(DateTime.Compare(scheduleDate, DateTime.Now) < 0)
        {
            throw new NotificationCreationException($"Date and Hour must be greater than {DateTime.Now}");
        }
        if(string.IsNullOrWhiteSpace(schedule.NotificationBody))
        {
            throw new NotificationCreationException("Notification Body can not be empty");
        }
        if(schedule.Emails.Count < 1)
        {
            throw new NotificationCreationException("Emails Recipient list must have at least one email");
        }
        foreach (var item in schedule.Emails)
        {
            if(string.IsNullOrWhiteSpace(item))
            {
                throw new NotificationCreationException("Email can not be empty");
            }
            if(!Regex.IsMatch(item, @"^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"))
            {
                throw new NotificationCreationException("Email format is invalid");
            }
        }
    }

    public void ValidateNotificationUpdateRequest(UpdateNotificationRequest schedule)
    {
        if(string.IsNullOrWhiteSpace(schedule.NotificationBody))
        {
            throw new NotificationUpdateException("Notification Body can not be empty");
        }
        if(schedule.Emails.Count < 1)
        {
            throw new NotificationUpdateException("Emails Recipient list must have at least one email");
        }
        foreach (var item in schedule.Emails)
        {
            if(string.IsNullOrWhiteSpace(item))
            {
                throw new NotificationUpdateException("Email can not be empty");
            }
            if(!Regex.IsMatch(item, @"^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"))
            {
                throw new NotificationUpdateException("Email format is invalid");
            }
        }
    }
}