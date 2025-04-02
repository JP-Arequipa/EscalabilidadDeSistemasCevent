import { NextResponse } from 'next/server';
import axios from 'axios';
import { TicketQrContentInterface } from '@/utils/interfaces/TIcketsInterfaces';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

/**
 * Fetches a ticket from the database based on QR content
 *
 * @returns Ticket details or an error message
 */
export async function POST(request: Request) {
  try {
    const { qrContent }: { qrContent: string } = await request.json();

    if (!qrContent) {
      return NextResponse.json(
        { error: 'QR content is required' },
        { status: 400 },
      );
    }

    const fullUrl = `${BASE_URL}/ticket-service/api/Ticket/qr`;
    const response = await axios.post<TicketQrContentInterface>(
      fullUrl,
      qrContent,
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    const statusCode = error.response?.status || 500;
    const errorMessage =
      error.response?.data?.message || 'Failed to fetch ticket by QR';

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
