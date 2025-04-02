import { NextResponse } from 'next/server';
import axios from 'axios';
import { AttendanceData } from '@/utils/interfaces/EventInterfaces';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

/**
 * Creates a new attendance record in the database
 *
 * @param {Request} request
 * @returns The created attendance or an error message
 */
export async function POST(request: Request) {
  const fullUrl = `${BASE_URL}/events/api/attendance`;

  try {
    const attendance: AttendanceData = await request.json();
    const response = await axios.post(fullUrl, attendance, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return NextResponse.json(response.data, { status: 201 });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Error creating attendance:',
        error.response?.data || error.message,
      );
    } else {
      console.error('Unknown error:', error);
    }
    return NextResponse.json(
      { error: 'Could not create the attendance' },
      { status: 500 },
    );
  }
}
