'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Box,
  TextField,
  Button,
  FormControl,
  FormGroup,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';

import { getTicketById } from '@/services/TicketService';
import { getEventById } from '@/services/EventService';

import LinearLoading from '@/components/Loaders/LinearLoading';
import TicketMessage from '../_components/TicketUsedMessage';
import { TicketValidatedDto } from '@/utils/interfaces/TicketInterfaces';
import { EventDetailDto } from '@/utils/interfaces/EventInterfaces';
import { useTicketRedemption } from '@/hooks/useTicketRedemtion';
import '@/styles/components/redeemTicket.css';
import RedeemFormField from '../_components/FormField';

export default function RedeemTicket() {
  const params = useParams();
  const router = useRouter();
  const id = params.ticketId as string;

  const [ticket, setTicket] = useState<TicketValidatedDto | null>(null);
  const [event, setEvent] = useState<EventDetailDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [ticketUsed, setTicketUsed] = useState(true);

  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const ticketData = await getTicketById(id);
        if (!ticketData) {
          return;
        }

        setTicket(ticketData);
        setTicketUsed(ticketData.isUsed);

        const eventData = await getEventById(ticketData.eventId.toString());
        setEvent(eventData);
      } catch (error) {
        console.error('Failed to fetch ticket data', error);
        router.push('/not-found');
      } finally {
        setLoading(false);
      }
    };

    fetchTicketData();
  }, [id, router]);

  const {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleSubmit,
    alert,
    handleAlertClose,
  } = useTicketRedemption(id, event, ticket);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          minHeight: '74vh',
          alignItems: 'center',
        }}
      >
        <LinearLoading text="Validating ticket..." />
      </Box>
    );
  }

  if (ticketUsed) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          minHeight: '74vh',
          alignItems: 'center',
        }}
      >
        <TicketMessage />
      </Box>
    );
  }

  if (ticket && event) {
    return (
      <>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            backgroundColor: '#fff',
            padding: 2,
            width: '100%',
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: 900,
              backgroundColor: 'white',
              padding: 4,
              minHeight: '70vh',
            }}
          >
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '2rem',
                textAlign: 'center',
                color: '#000',
                marginBlock: '4rem',
              }}
            >
              Redeem Tickets
            </Typography>

            <form onSubmit={onSubmit}>
              <FormGroup>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 2,
                    '@media (max-width: 600px)': { gridTemplateColumns: '1fr' },
                  }}
                >
                  <RedeemFormField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                  />
                  <RedeemFormField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName}
                  />
                </Box>

                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 2,
                    marginTop: 2,
                    '@media (max-width: 600px)': { gridTemplateColumns: '1fr' },
                  }}
                >
                  <RedeemFormField
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    error={Boolean(errors.phoneNumber)}
                    helperText={errors.phoneNumber}
                  />
                  <RedeemFormField
                    label="Code"
                    name="code"
                    value={id}
                    disabled
                  />
                </Box>

                <Box sx={{ marginTop: 2 }}>
                  <RedeemFormField
                    label="Email Address"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={Boolean(errors.email)}
                    helperText={
                      errors.email ||
                      'This email will be used to send you the ticket'
                    }
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 4,
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      width: '50%',
                      padding: '12px 0',
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      borderRadius: 2,
                      '@media (max-width: 600px)': {
                        width: '100%',
                        padding: '10px 0',
                      },
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Saving...' : 'Confirm'}
                  </Button>
                </Box>
              </FormGroup>
            </form>
          </Box>
        </Box>
        <Snackbar
          open={alert.open}
          autoHideDuration={3000}
          onClose={handleAlertClose}
        >
          <Alert
            onClose={handleAlertClose}
            severity={alert.severity}
            sx={{ width: '100%' }}
            variant="filled"
          >
            {alert.message}
          </Alert>
        </Snackbar>
      </>
    );
  }
}
