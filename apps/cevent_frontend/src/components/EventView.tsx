'use client';
import React, { useEffect, useState } from 'react';
import { Box, Card, Grid, Button, Typography } from '@mui/material';
import { EventDetailDto } from '@/utils/interfaces/EventInterfaces';
import styles from '@/styles/components/EventStyles';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import MailIcon from '@mui/icons-material/Mail';
import { format } from 'date-fns';
import axios from 'axios';
import { useRouter } from 'next/router';

const EventView = () => {
  const [eventData, setEventData] = useState<EventDetailDto | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchEventData = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/events/api/event?id=${id}`,
          );
          setEventData(response.data);
        } catch (error) {
          console.error('Failed to fetch event data:', error);
        }
      };

      fetchEventData();
    }
  }, [id]);

  if (!eventData) return <Typography>Loading...</Typography>;

  const formattedDate = (date: Date) => format(new Date(date), 'MMMM dd, yyyy');
  const formattedTime = (date: Date) => format(new Date(date), 'h:mm a');

  return (
    <Card sx={styles.cardStyles}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography variant="h5" sx={styles.titleStyles}>
            {eventData.name}
          </Typography>
          <Typography variant="body2" sx={styles.chipCategoryStyles}>
            {eventData.category.keyWord}
          </Typography>
          <Box sx={styles.infoSection}>
            <Box sx={styles.infoRow}>
              <EventIcon sx={styles.iconStyles} />
              <Typography variant="body2" sx={styles.labelStyles}>
                Date and time
              </Typography>
              <Typography variant="body1">
                {formattedDate(eventData.eventDate)}
              </Typography>
            </Box>

            <Box sx={styles.infoRow}>
              <LocationOnIcon sx={styles.iconStyles} />
              <Typography variant="body2" sx={styles.labelStyles}>
                Address
              </Typography>
              <Typography variant="body1" sx={styles.linkStyles}>
                {eventData.address}
              </Typography>
            </Box>

            <Typography variant="body2" sx={styles.shareTextStyles}>
              Share with friends
            </Typography>
            <Box sx={styles.iconGroup}>
              <ContentCopyOutlinedIcon sx={styles.iconShareStyles} />
              <MailIcon sx={styles.iconShareStyles} />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={4} sx={styles.subscribeSection}>
          <Typography variant="h6" sx={styles.subscribeTitleStyles}>
            Subscribe now
          </Typography>
          <Box sx={styles.infoRow}>
            <PeopleOutlineIcon sx={styles.iconStyles} />
            <Typography variant="body2" sx={styles.labelStyles}>
              Capacity
            </Typography>
            <Typography variant="body1">{eventData.attendeeCount}</Typography>
          </Box>
          <Box sx={styles.infoRow}>
            <AttachMoneyIcon sx={styles.iconStyles} />
            <Typography variant="body2" sx={styles.labelStyles}>
              Price
            </Typography>
            <Typography variant="body1">
              ${eventData.ticketPrice} USD
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<CalendarMonthIcon />}
            sx={styles.calendarButtonStyles}
          >
            Add to Google Calendar
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={styles.ticketButtonStyles}
          >
            Get my ticket
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default EventView;
