using NotificationService.Dtos;

namespace NotificationService.Validations;
public interface INotifcationValidation
{
    void ValidateNotificationCreateRequest(ScheduleNotificationRequest schedule);
    void ValidateNotificationUpdateRequest(UpdateNotificationRequest schedule);
}