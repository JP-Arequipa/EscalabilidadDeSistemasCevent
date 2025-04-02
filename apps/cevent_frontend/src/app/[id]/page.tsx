'use client';
import React, { useEffect, useState } from 'react';
import { Alert, Box, Snackbar, Typography } from '@mui/material';
import {
  EventDetailDto,
  EventClickDto,
} from '@/utils/interfaces/EventInterfaces';
import { useParams } from 'next/navigation';
import { getEventById } from '@/services/EventService';
import CardEventInfo from './_components/CardEventInfo';
import Layout from '@/components/Layout';
import Image from 'next/image';
import { styles } from '@/styles/components/EventPageStyles';
import DetailsEvent from './_components/DetailsEvent';
import RelatedEvent from './_components/RelatedEvent';
import SkeletonEventsBox from '@/components/EventSection/SkeletonEventsBox';
import { createClickedEvent } from '@/services/EventService';

const EventPage = () => {
  const [eventData, setEventData] = useState<EventDetailDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    if (id) {
      getEventById(id.toString())
        .then((data) => {
          setEventData(data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    const postClick = async () => {
      if (eventData) {
        try {
          const eventClick: EventClickDto = {
            eventId: eventData.id,
            userId: eventData.organizerUserId,
          };
          await createClickedEvent(eventClick);
        } catch (error) {
          console.error(error);
        }
      }
    };

    postClick();
  }, [eventData]);

  return (
    <>
      {loading ? (
        <Layout>
          <Box sx={{ height: '900px' }}>
            <SkeletonEventsBox />
          </Box>
        </Layout>
      ) : eventData !== null ? (
        <Box sx={styles.mainContainer}>
          <Box sx={styles.containerImage}>
            <Image
              src={eventData.coverPhotoUrl}
              alt="Empty"
              width={1080}
              height={480}
            />
          </Box>
          <Layout>
            <Box sx={{ position: 'relative', height: '220px' }}>
              <CardEventInfo
                eventData={eventData}
                showSnackbar={(message: string) => {
                  setSnackbarMessage(message);
                  setSnackbarOpen(true);
                }}
              />
            </Box>
            <DetailsEvent event={eventData} />
            <RelatedEvent category={eventData.category} />
          </Layout>
        </Box>
      ) : (
        <Typography>Event not found</Typography>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default EventPage;
