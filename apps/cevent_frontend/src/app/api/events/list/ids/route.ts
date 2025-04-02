import { NextResponse } from 'next/server';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const eventsIds = body.ids;

    if (!eventsIds || !Array.isArray(eventsIds)) {
      return NextResponse.json(
        { error: 'Invalid or missing ids array in the request body' },
        { status: 400 },
      );
    }

    const fullUrl = `${BASE_URL}/events/api/event/by-ids`;

    const response = await axios.post(fullUrl, eventsIds, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 },
    );
  }
}
