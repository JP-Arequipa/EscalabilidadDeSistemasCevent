import { NextResponse } from 'next/server';
import axios from 'axios';
import { EventFilter, SortOptions } from '@/utils/interfaces/EventInterfaces';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const filters: EventFilter = {
    page: Number(searchParams.get('page')) || 1,
    pageSize: Number(searchParams.get('pageSize')) || 10,
    Category: searchParams.get('Category') || undefined,
    StartDate: searchParams.get('StartDate') || undefined,
    EndDate: searchParams.get('EndDate') || undefined,
    MinPrice: searchParams.get('MinPrice')
      ? Number(searchParams.get('MinPrice'))
      : undefined,
    MaxPrice: searchParams.get('MaxPrice')
      ? Number(searchParams.get('MaxPrice'))
      : undefined,
    Status: searchParams.get('Status') || undefined,
    SortBy: (searchParams.get('SortBy') as SortOptions) || undefined,
    IsDescending: searchParams.get('IsDescending') === 'true',
    IsPromoted: searchParams.get('IsPromoted') === 'true' || undefined,
    OrganizerUserId: searchParams.get('OrganizerUserId') || undefined,
  };
  const queryParams = Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value !== undefined),
  );
  try {
    const response = await axios.get(
      `${BASE_URL}/events/api/Event/summaryEvent`,
      {
        params: queryParams,
      },
    );
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 },
    );
  }
}
