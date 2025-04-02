import axios from 'axios';
import { AttendanceData } from '@/utils/interfaces/EventInterfaces';

export const createAttendance = async (
  attendanceData: AttendanceData,
): Promise<AttendanceData | null> => {
  if (!attendanceData) {
    throw new Error('Data content is required');
  }
  try {
    const response = await axios.post<AttendanceData>(
      '/api/attendance/',
      attendanceData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.status === 201) {
      return response.data;
    }

    return null;
  } catch (error) {
    return null;
  }
};
