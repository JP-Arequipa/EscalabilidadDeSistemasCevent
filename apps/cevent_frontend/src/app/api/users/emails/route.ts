import axios from 'axios';
import { NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function POST(request: Request) {
  try {
    const emails: string[] = await request.json();
    const response = await axios.post<string[]>(
      `${BASE_URL}/events/api/User/GetIdsByEmails`,
      emails,
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    let statusCode = 500;
    let errorMessage = 'Failed to fetch user IDs';

    if (axios.isAxiosError(error) && error.response) {
      statusCode = error.response.status;
      errorMessage = error.response.data;
    }
    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
