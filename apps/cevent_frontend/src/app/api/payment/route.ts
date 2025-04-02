import { PaymentInterface } from '@/utils/interfaces/Payment';
import axios from 'axios';
import { NextResponse } from 'next/server';

const stripe = require('stripe')(
  process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string,
);

export async function POST(request: Request) {
  const payment: PaymentInterface = await request.json();
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: payment.amount,
      currency: payment.currency,
    });

    return NextResponse.json(paymentIntent, { status: 201 });
  } catch (error) {
    let statusCode = 500;
    let errorMessage = 'Failed to create payment';
    if (axios.isAxiosError(error) && error.response) {
      statusCode = error.response.status;
      errorMessage = error.response.data;
    }
    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
