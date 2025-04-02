import { NextResponse } from 'next/server';
import axios from 'axios';
import { EventActivityDto } from '@/utils/interfaces/EventActivities';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function PUT(
  request: Request,
  { params }: { params: { id: string; activityId: string } },
) {
  let eventActivity: EventActivityDto;

  try {
    const requestBody = await request.json();
    if (!isValidEventActivityDto(requestBody)) {
      return NextResponse.json(
        { error: 'Invalid event activity data' },
        { status: 400 },
      );
    }

    eventActivity = requestBody;
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON format' }, { status: 400 });
  }

  const { id, activityId } = params;
  try {
    const response = await axios({
      method: 'put',
      url: `${BASE_URL}/events/api/EventActivities/${id}/activities/${activityId}`,
      data: eventActivity,
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    let statusCode = 500;
    let errorMessage = 'Failed to update activity';

    if (axios.isAxiosError(error)) {
      if (error.response) {
        statusCode = error.response.status;
        errorMessage = error.response.data || errorMessage;
      }

      console.error('Axios Error:', error.response?.data || error.message);
    }

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string; activityId: string } },
) {
  const { id, activityId } = params;

  try {
    const response = await axios({
      method: 'delete',
      url: `${BASE_URL}/events/api/EventActivities/${id}/activities/${activityId}`,
      headers: { accept: 'text/plain' },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    let statusCode = 500;
    let errorMessage = 'Failed to delete activity';

    if (axios.isAxiosError(error)) {
      if (error.response) {
        statusCode = error.response.status;
        errorMessage = error.response.data || errorMessage;
      }

      console.error('Axios Error:', error.response?.data || error.message);
    }

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}

function isValidEventActivityDto(data: any): data is EventActivityDto {
  return (
    typeof data.name === 'string' &&
    typeof data.description === 'string' &&
    typeof data.startTime === 'string' &&
    typeof data.endTime === 'string' &&
    typeof data.status === 'number' &&
    typeof data.capacity === 'number'
  );
}
