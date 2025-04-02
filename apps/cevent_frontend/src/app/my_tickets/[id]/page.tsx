'use client';
import Layout from '@/components/Layout';
import { RootState } from '@/redux/store';
import { getEventById } from '@/services/EventService';
import { fetchTicketsByUserId } from '@/services/TicketService';
import { EventDetailDto } from '@/utils/interfaces/EventInterfaces';
import { Ticket, TicketFilter } from '@/utils/interfaces/TIcketsInterfaces';
import {
  Alert,
  Box,
  ButtonBase,
  IconButton,
  Link,
  Snackbar,
  Typography,
} from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import InfoEvent from './_components/InfoEvent';
import LinearLoading from '@/components/Loaders/LinearLoading';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { routes } from '@/utils/navigation/Routes';
import InfoTicket from './_components/InfoTicket';

const TicketPage = () => {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [event, setEvent] = useState<EventDetailDto | null>(null);
  const { id } = useParams<{ id: string }>();
  const user = useSelector((state: RootState) => state.user.userInfo);
  const router = useRouter();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const filterTickets: TicketFilter = {
      eventId: parseInt(id),
    };
    if (user?.id) {
      Promise.all([
        getEventById(id),
        fetchTicketsByUserId(user?.id, filterTickets),
      ])
        .then(([event, tickets]) => {
          setEvent(event);
          setTickets(tickets);
          setLoading(false);
        })
        .finally(() => setLoading(false));
    }
  }, [id, user?.id]);

  return (
    <Box sx={{ minHeight: '68vh' }}>
      <Layout>
        <ButtonBase onClick={() => router.push(routes.myTickets)}>
          <ArrowBackIosIcon />
          <Typography variant="bodyLarge" component="h1">
            Back to my tickets
          </Typography>
        </ButtonBase>

        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              minHeight: '60vh',
              alignItems: 'center',
            }}
          >
            <LinearLoading text="Loading tickets..." />
          </Box>
        ) : event ? (
          <>
            <InfoEvent eventData={event} />
            <Box>
              <Typography variant="h2" color="primary" sx={{ marginBottom: 2 }}>
                Ticket list:
              </Typography>
              {tickets.map((ticket, index) => (
                <InfoTicket
                  key={ticket.ticketId}
                  ticketData={ticket}
                  ticketNumber={index + 1}
                  ticketPrice={event.ticketPrice}
                  setOpenSnackbar={setOpenSnackbar}
                  setSnackbarMessage={setSnackbarMessage}
                  eventData={event}
                />
              ))}
            </Box>
          </>
        ) : null}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert severity="success">{snackbarMessage}</Alert>
        </Snackbar>
      </Layout>
    </Box>
  );
};

export default TicketPage;
