'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box,
  Grid,
  Typography,
  Divider,
  Paper,
  TextField,
  Button,
} from '@mui/material';
import checkoutStyles from '@/styles/components/CheckoutStyles';
import {
  EventDetailDto,
  EventStatus,
} from '@/utils/interfaces/EventInterfaces';
import { getEventById, updateStatusEvent } from '@/services/EventService';
import PaymentForm from '@/components/Checkout/PaymentForm';
import { PaymentInterface } from '@/utils/interfaces/Payment';
import LinearLoading from '@/components/Loaders/LinearLoading';
import Layout from '@/components/Layout';
import { generateTickets } from '@/services/TicketService';
import { TicketPostInterface } from '@/utils/interfaces/TIcketsInterfaces';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function Checkout() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get('eventId') || '';
  const quantity = searchParams.get('quantity') || '0';
  const [eventData, setEventData] = useState<EventDetailDto | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [platformFee, setPlatformFee] = useState<number>(0);
  const [finalTotalPrice, setFinalTotalPrice] = useState<number>(0);
  const user = useSelector((state: RootState) => state.user.userInfo);

  useEffect(() => {
    if (eventId && quantity) {
      getEventById(eventId)
        .then((event) => {
          if (event) {
            setEventData(event);
            const platform = event.ticketPrice * 0.03;
            setPlatformFee(platform);
            const totalPrice = event.ticketPrice * parseInt(quantity, 10);
            setFinalTotalPrice(totalPrice + platform);
          } else {
            router.push('/not_found');
          }
        })
        .catch((error) => {
          console.error(error);
          router.push('/not_found');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      router.push('/not_found ');
    }
  }, [eventId, quantity, router]);

  const getTickets = async (): Promise<boolean> => {
    if (eventId) {
      const ticketPost: TicketPostInterface = {
        eventId: eventData?.id || 0,
        userId: user?.id || '',
      };
      const dataUpdated = await getEventById(eventId);
      const response = await generateTickets(
        ticketPost,
        parseInt(quantity, 10),
      );
      const eventStatus: EventStatus = {
        attendeeCount: (dataUpdated?.attendeeCount ?? 0) + parseInt(quantity),
      };
      const status = await updateStatusEvent(eventStatus, parseInt(eventId));
      return response && status ? true : false;
    }
    return false;
  };

  return (
    <Box sx={checkoutStyles.container}>
      <Layout>
        <Typography color="primary" sx={checkoutStyles.title}>
          Checkout
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Paper
              elevation={3}
              sx={{ ...checkoutStyles.formContainer, maxWidth: '800px' }}
            >
              {finalTotalPrice > 0 && eventData ? (
                <PaymentForm
                  callBackFunction={getTickets}
                  linkToRedirect={'/my_tickets'}
                  paymentInterface={
                    {
                      amount: finalTotalPrice,
                      currency: 'usd',
                    } as PaymentInterface
                  }
                />
              ) : (
                <LinearLoading text="Loading checkout information" />
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper elevation={3} sx={checkoutStyles.orderSummary}>
              {eventData?.coverPhotoUrl && (
                <img
                  src={eventData?.coverPhotoUrl}
                  alt="Event Cover"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    marginBottom: '16px',
                  }}
                />
              )}

              <Typography sx={checkoutStyles.sectionTitle}>
                Order Summary
              </Typography>
              <Box sx={checkoutStyles.orderRow}>
                <Typography>
                  {eventData?.name} x{quantity}
                </Typography>
                <Typography>$ {eventData?.ticketPrice}</Typography>
              </Box>
              <Box sx={checkoutStyles.totalRow}>
                <Typography>Platform (3%)</Typography>
                <Typography>${platformFee.toFixed(2)} </Typography>
              </Box>
              <Divider sx={checkoutStyles.divider} />
              <Box sx={checkoutStyles.totalRow}>
                <Typography>Total Price</Typography>
                <Typography>${finalTotalPrice.toFixed(2)} </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Layout>
    </Box>
  );
}
