export interface NotificationScheduleRequestDto {
  date: string;
  hour: string;
  emails: string[];
  notificationBody: string;
}

export interface ScheduledNotificationResponseDto
  extends NotificationScheduleRequestDto {
  id: string;
  scheduledTime: string;
  recipients: string;
  isSent: boolean;
}
