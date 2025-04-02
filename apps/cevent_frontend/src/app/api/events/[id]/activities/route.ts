import { NextResponse } from 'next/server';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

/**
 * Fetches event activities by id and status
 *
 * @param request  The request object
 * @param context  The context object containing route parameters
 * @returns The response object
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  console.log('I am here in local api');

  const { id } = params;
  const url = new URL(request.url);
  const status = url.searchParams.get('status');
  if (!status) {
    return NextResponse.json(
      { error: 'Status parameter is required' },
      { status: 400 },
    );
  }

  try {
    const apiUrl = `${BASE_URL}/events/api/EventActivities/${id}/activities/status?status=${status}`;
    console.log('Fetching from:', apiUrl);
    const response = await axios.get(apiUrl);
    console.log(response);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch event activities' },
      { status: 500 },
    );
  }
}

/**
 * Handles the POST request to create an activity under a specific event.
 *
 * @param request  The request object containing the activity data
 * @param context  The context object containing route parameters (eventId)
 * @returns The response object with the created activity data
 */
export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  console.log('Handling POST request to create activity');

  const { id } = params;

  try {
    const activityData = await request.json();

    const apiUrl = `${BASE_URL}/events/api/EventActivities/${id}/activities`;

    const response = await axios.post(apiUrl, activityData, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'text/plain',
      },
    });

    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    console.error('Error creating activity:', error);
    return NextResponse.json(
      { error: 'Failed to create event activity' },
      { status: 500 },
    );
  }
}
