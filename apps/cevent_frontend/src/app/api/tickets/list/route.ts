import { NextResponse } from 'next/server';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

/**
 * Fetches all tickets from the database
 *
 * @returns list of all tickets or an error message
 */
export async function GET(request: Request) {
  const fullUrl = `${BASE_URL}/ticket-service/api/Ticket`;
  try {
    const response = await axios.get(fullUrl);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    const statusCode = error.response?.status || 500;
    const errorMessage =
      error.response?.data?.message || 'Failed to fetch tickets';

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
