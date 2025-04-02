import {
  NotificationScheduleRequestDto,
  ScheduledNotificationResponseDto,
} from '@/utils/interfaces/NotificationInterfaces';
import axios from 'axios';
export const scheduleEmail = async (
  notificationBody: NotificationScheduleRequestDto,
): Promise<ScheduledNotificationResponseDto | null> => {
  try {
    const response = await axios.post(
      '/api/notification/schedule',
      notificationBody,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
