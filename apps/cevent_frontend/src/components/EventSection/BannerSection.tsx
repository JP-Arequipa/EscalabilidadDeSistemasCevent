import { fetchHomePageEvents } from '@/services/EventService';
import {
  EventFilter,
  EventHomePageDto,
} from '@/utils/interfaces/EventInterfaces';
import { useEffect, useState } from 'react';
import SliderBanners from './SliderBanners';
import { Box } from '@mui/material';

const BannerSection = () => {
  const [events, setEvents] = useState<EventHomePageDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const filter: EventFilter = {
      page: 1,
      pageSize: 10,
      IsPromoted: true,
    };
    fetchHomePageEvents(filter)
      .then((events) => {
        setEvents(events);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return loading ? (
    <Box></Box>
  ) : (
    events.length > 0 && <SliderBanners events={events} />
  );
};

export default BannerSection;
