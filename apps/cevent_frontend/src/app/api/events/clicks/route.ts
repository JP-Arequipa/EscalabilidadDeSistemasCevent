import { NextResponse } from 'next/server';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function POST(request: Request) {
  const fullUrl = `${BASE_URL}/events/api/event/event-clicks`;

  try {
    const eventData = await request.json();

    const response = await axios.post(fullUrl, eventData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return NextResponse.json(response.data, { status: 201 });
  } catch (error: unknown) {
    console.error(error);
  }
}
