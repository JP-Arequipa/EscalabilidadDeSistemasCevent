import axios from 'axios';
import { NextResponse } from 'next/server';
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function GET(request: Request) {
  try {
    const fullUrl = `${BASE_URL}/events/api/event/audit/eventStadistics`;
    const response = await axios.get(fullUrl);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 },
    );
  }
}
