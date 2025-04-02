import { NextResponse } from 'next/server';
import axios from 'axios';
import { TicketFilter } from '@/utils/interfaces/TIcketsInterfaces';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

/**
 * Fetches all tickets from the database based in the user Id
 *
 * @returns list of all tickets or an error message
 */

export async function GET(
  request: Request,
  { params }: { params: { userId: string } },
) {
  const { userId } = params;
  const { searchParams } = new URL(request.url);

  const filters: TicketFilter = {
    eventId: searchParams.get('eventId')
      ? Number(searchParams.get('eventId'))
      : undefined,
    isUsed: searchParams.get('isUsed') === 'true' || undefined,
  };

  if (!userId) {
    return NextResponse.json({ error: 'User Id is required' }, { status: 400 });
  }

  const fullUrl = `${BASE_URL}/ticket-service/api/Ticket/user/${userId}`;

  try {
    const response = await axios.get(fullUrl, { params: filters });
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    const statusCode = error.response?.status || 500;
    const errorMessage =
      error.response?.data?.message || 'Failed to fetch tickets';

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
