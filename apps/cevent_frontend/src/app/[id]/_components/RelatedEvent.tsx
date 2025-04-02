import EventsBox from '@/components/EventSection/EventsBox';
import SkeletonEventsBox from '@/components/EventSection/SkeletonEventsBox';
import { fetchHomePageEvents } from '@/services/EventService';
import { EventCategory } from '@/utils/interfaces/Categories';
import {
  EventFilter,
  EventHomePageDto,
} from '@/utils/interfaces/EventInterfaces';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

interface RelatedEvetnsProps {
  category: EventCategory;
}

const RelatedEvent = ({ category }: RelatedEvetnsProps) => {
  const [events, setEvents] = useState<EventHomePageDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const filters: EventFilter = {
      page: 1,
      pageSize: 6,
      Category: category.keyWord,
      IsDescending: true,
      StartDate: new Date().toISOString(),
    };
    fetchHomePageEvents(filters)
      .then((data) => {
        setEvents(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <Box>
      {loading ? (
        <SkeletonEventsBox />
      ) : (
        <Box sx={{ marginBottom: 1.5 }}>
          <Typography variant="h3">Related Events</Typography>
          <EventsBox events={events} />
        </Box>
      )}
    </Box>
  );
};

export default RelatedEvent;
