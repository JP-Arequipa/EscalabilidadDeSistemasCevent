import { TicketViewInterface } from '@/utils/interfaces/TIcketsInterfaces';
import axios from 'axios';
import { NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function POST(request: Request) {
  const ticketPost = await request.json();
  try {
    const { pathname } = new URL(request.url);

    const quantity = pathname.split('/').pop();
    const response = await axios.post<TicketViewInterface>(
      `${BASE_URL}/ticket-service/api/ticket/generate/${quantity}`,
      ticketPost,
    );

    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    let statusCode = 500;
    let errorMessage = 'Failed to create ticket';

    if (axios.isAxiosError(error) && error.response) {
      statusCode = error.response.status;
      errorMessage = error.response.data;
    }

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
