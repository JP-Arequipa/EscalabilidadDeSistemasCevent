import axios from 'axios';
import { NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const qrContent: string = await request.text();
    const response = await axios.post(
      `${BASE_URL}/ticket-service/api/Ticket/validate`,
      qrContent,
      { headers: { 'Content-Type': 'application/json' } },
    );

    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    let statusCode = 500;
    let errorMessage = 'Failed to validate ticket';

    if (axios.isAxiosError(error)) {
      if (error.response) {
        statusCode = error.response.status || 500;
        errorMessage = error.response.data || 'Unknown error';
      } else {
        errorMessage = error.message;
      }
    }

    console.error(errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
