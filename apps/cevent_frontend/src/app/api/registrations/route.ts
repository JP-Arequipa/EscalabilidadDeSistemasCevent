import {
  RegistrationInputDto,
  RegistrationOutputDto,
} from '@/utils/interfaces/Registration';
import axios from 'axios';
import { NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function POST(request: Request) {
  try {
    const registration: RegistrationInputDto = await request.json();
    const response = await axios.post<RegistrationOutputDto>(
      `${BASE_URL}/events/api/registration`,
      registration,
    );

    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    let statusCode = 500;
    let errorMessage = 'Failed to create registration';

    if (axios.isAxiosError(error) && error.response) {
      statusCode = error.response.status;
      errorMessage = error.response.data;
    }

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
