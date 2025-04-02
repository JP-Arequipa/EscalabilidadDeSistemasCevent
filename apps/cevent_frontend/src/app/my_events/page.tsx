'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Pagination } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import EmptyEventSection from './_components/EmptyEventSection';
import LoginPromptSection from './_components/LoginPromptSection';
import { useSelector } from 'react-redux';
import {
  fetchHomePageEvents,
  getEventStadistics,
} from '@/services/EventService';
import { RootState } from '@/redux/store';
import {
  EventHomePageDto,
  EventFilter,
} from '@/utils/interfaces/EventInterfaces';
import Layout from '@/components/Layout';
import LinearLoading from '@/components/Loaders/LinearLoading';
import EventCardPage from './_components/EventCardPage';

export default function MyEventsPage() {
  const [events, setEvents] = useState<EventHomePageDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state: RootState) => state.user.userInfo);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const fetchEvents = (page: number) => {
    const filter: EventFilter = {
      page: page,
      pageSize: PAGE_SIZE,
      OrganizerUserId: user?.id,
    };
    setIsLoading(true);

    fetchHomePageEvents(filter)
      .then((data) => {
        if (data) {
          setEvents(data);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchTotalEvents = async () => {
    let totalEvents = 0;
    let currentResponse = 0;
    const pageSize = 100;
    let page = 0;
    do {
      page++;
      const filter: EventFilter = {
        page: page,
        pageSize: pageSize,
        OrganizerUserId: user?.id,
      };
      const response: EventHomePageDto[] = await fetchHomePageEvents(filter);
      currentResponse = response.length;
      totalEvents += response.length;
    } while (currentResponse !== 0);

    setTotalPages(Math.ceil(totalEvents / PAGE_SIZE));
  };

  useEffect(() => {
    if (user) {
      fetchEvents(page);
      fetchTotalEvents();
    }
  }, [user, page]);

  const handleCreateEvent = () => {
    router.push('/create_event');
  };

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" sx={{ height: '80vh' }}>
        <LinearLoading text="Loading your events..." />
      </Box>
    );
  }

  if (!session) {
    return (
      <Box sx={{ padding: '2rem' }}>
        <Typography variant="h4" fontWeight="bold">
          My Events
        </Typography>
        <Box mt={4}>
          <LoginPromptSection />
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ padding: '2rem', minHeight: '65vh' }}>
        <Layout>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h4" fontWeight="bold">
              My Events
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleCreateEvent}
              sx={{ borderRadius: '10px' }}
            >
              Create Event
            </Button>
          </Box>
        </Layout>

        {isLoading && events.length === 0 ? (
          <Box display="flex" justifyContent="center" sx={{ height: '80vh' }}>
            <LinearLoading text="Please wait..." />
          </Box>
        ) : events.length === 0 ? (
          <Box
            mt={4}
            sx={{
              height: '50vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <EmptyEventSection />
          </Box>
        ) : (
          <Box mt={3} sx={{ width: '100%' }}>
            <Layout>
              {events.map((event) => (
                <EventCardPage event={event} />
              ))}
            </Layout>
          </Box>
        )}
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            color="primary"
            onChange={(e, p) => setPage(p)}
          />
        </Box>
      </Box>
    </>
  );
}
