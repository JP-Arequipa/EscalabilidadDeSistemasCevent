import { NextResponse } from 'next/server';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

/**
 * Fetches all promoted events from the database
 *
 * @returns list of banners events
 */
export async function GET(request: Request) {
  const { searchParams, pathname } = new URL(request.url);

  const category = pathname.split('/').pop();

  const page = searchParams.get('page') || '1';
  const pageSize = searchParams.get('pageSize') || '10';

  if (!category) {
    return NextResponse.json(
      { error: 'Category is required' },
      { status: 400 },
    );
  }

  const fullUrl = `${BASE_URL}/events/api/event/banner/${category}`;

  try {
    const response = await axios.get(fullUrl, {
      params: {
        page: Number(page),
        pageSize: Number(pageSize),
      },
    });
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 },
    );
  }
}
