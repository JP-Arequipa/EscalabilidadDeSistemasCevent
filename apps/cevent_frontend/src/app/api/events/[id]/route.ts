import { NextResponse } from 'next/server';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

/**
 * Fetches a single event by id
 *
 * @param request  The request object
 * @param context  The context object containing route parameters
 * @returns The response object
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  try {
    const response = await axios.get(`${BASE_URL}/events/api/event/${id}`);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  try {
    const body = await request.json();
    const userId = request.headers.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required in headers' },
        { status: 400 },
      );
    }

    const response = await axios.put(
      `${BASE_URL}/events/api/event/${id}`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
          userId,
        },
      },
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error('Error updating event:', error);

    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 },
    );
  }
}
