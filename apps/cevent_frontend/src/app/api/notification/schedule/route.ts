import {
  NotificationScheduleRequestDto,
  ScheduledNotificationResponseDto,
} from '@/utils/interfaces/NotificationInterfaces';
import axios from 'axios';
import { NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function POST(request: Request) {
  try {
    const payload: ScheduledNotificationResponseDto = await request.json();
    console.log('body', payload);
    const response = await axios.post<NotificationScheduleRequestDto>(
      `${BASE_URL}/notification/Mail/schedule`,
      payload,
    );
    console.log(response);

    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    let statusCode = 500;
    let errorMessage = 'Failed to schedule the notification';

    if (axios.isAxiosError(error) && error.response) {
      statusCode = error.response.status;
      errorMessage = error.response.data;
    }

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
