import { EventDetailDto } from '@/utils/interfaces/EventInterfaces';
import axios from 'axios';
import { NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const eventStatus = await request.json();

  const { id } = params;
  try {
    const response = await axios.post<EventDetailDto>(
      `${BASE_URL}/events/api/event/UpdateStatus/${id}`,
      eventStatus,
    );

    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    let statusCode = 500;
    let errorMessage = 'Failed to create ticket';

    if (axios.isAxiosError(error) && error.response) {
      statusCode = error.response.status;
      errorMessage = error.response.data;
    }

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
