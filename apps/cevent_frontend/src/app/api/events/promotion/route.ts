import { PromoteEventDto } from '@/utils/interfaces/Promotions';
import axios from 'axios';
import { NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function POST(request: Request) {
  const fullUrl = `${BASE_URL}/events/api/event/promotionEvent`;
  try {
    const promoteDto: PromoteEventDto = await request.json();
    const response = await axios.post(fullUrl, promoteDto, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return NextResponse.json(response.data, { status: 201 });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Error promoting event:',
        error.response?.data || error.message,
      );
    } else {
      console.error('Unknown error:', error);
    }
    return NextResponse.json(
      { error: 'Failed to promote event' },
      { status: 500 },
    );
  }
}
