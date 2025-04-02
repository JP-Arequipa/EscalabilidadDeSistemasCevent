import axios from 'axios';
import { NextResponse } from 'next/server';
import { UpdateStatusRegistration } from '@/utils/interfaces/Registration';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function POST(request: Request) {
  try {
    const { attendanceStatus } = await request.json();
    const { pathname } = new URL(request.url);
    const ticketId = pathname.split('/').pop();

    if (!ticketId) {
      return NextResponse.json(
        { error: 'El campo "id" es obligatorio.' },
        { status: 400 },
      );
    }

    const updateStatus: UpdateStatusRegistration = { attendanceStatus };

    const response = await axios.post(
      `${BASE_URL}/events/api/registration/updateStatus/${ticketId}`,
      updateStatus,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    let statusCode = 500;
    let errorMessage = 'Failed to update registration status';

    if (axios.isAxiosError(error) && error.response) {
      statusCode = error.response.status;
      errorMessage = error.response.data;
    }

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
