import { UserInterface } from '@/utils/interfaces/UserInterfaces';
import axios from 'axios';
import { NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function POST(request: Request) {
  try {
    const user: UserInterface = await request.json();
    const response = await axios.post<UserInterface>(
      `${BASE_URL}/events/api/user`,
      user,
    );

    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    let statusCode = 500;
    let errorMessage = 'Failed to create user';

    if (axios.isAxiosError(error) && error.response) {
      statusCode = error.response.status;
      errorMessage = error.response.data;
    }

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
