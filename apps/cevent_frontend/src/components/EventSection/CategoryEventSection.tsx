import { EventCategory } from '@/utils/interfaces/Categories';
import { Box, ButtonBase, Typography } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import {
  EventFilter,
  EventHomePageDto,
  SortOptions,
} from '@/utils/interfaces/EventInterfaces';
import {
  fetchHomePageEvents,
  fetchBannerEvents,
} from '@/services/EventService';
import EventsBox from './EventsBox';
import SkeletonEventsBox from './SkeletonEventsBox';
import EmptyEventSection from './EmptyEventSection';
import SliderEvents from './SliderEvents';
import { useRouter } from 'next/navigation';
import { ALL_CATEGORY_VALUE } from '@/utils/constans';

interface EventSectionProps {
  category: EventCategory;
}

const CategoryEventSection = ({ category }: EventSectionProps) => {
  const [events, setEvents] = useState<EventHomePageDto[]>([]);
  const [bannerEvents, setBannerEvents] = useState<EventHomePageDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const route = useRouter();

  useEffect(() => {
    const filters: EventFilter = {
      page: 1,
      pageSize: category.keyWord === ALL_CATEGORY_VALUE.keyWord ? 6 : 9,
      Category:
        category.keyWord !== ALL_CATEGORY_VALUE.keyWord
          ? category.keyWord
          : undefined,
      SortBy: SortOptions.EventDate,
      IsDescending: true,
    };

    setLoading(true);

    Promise.all([
      fetchHomePageEvents(filters),
      fetchBannerEvents(category.keyWord),
    ])
      .then(([homePageData, bannerData]) => {
        setEvents(homePageData);
        setBannerEvents(bannerData);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleRedirect = () => {
    route.push(`/category/${category.keyWord}`);
  };
  return (
    <Box sx={{ mt: 4 }}>
      <Box>
        <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
          {category.keyWord.toUpperCase()}
        </Typography>
      </Box>
      {category.keyWord !== ALL_CATEGORY_VALUE.keyWord && (
        <SliderEvents events={bannerEvents} />
      )}
      {events.length < 1 ? (
        loading ? (
          <SkeletonEventsBox />
        ) : (
          <EmptyEventSection />
        )
      ) : (
        <EventsBox
          events={
            category.keyWord === ALL_CATEGORY_VALUE.keyWord
              ? events
              : events.slice(3, 9)
          }
        />
      )}
      {category.keyWord !== ALL_CATEGORY_VALUE.keyWord && (
        <ButtonBase sx={{ marginTop: 2 }} onClick={handleRedirect}>
          <Typography
            variant="body"
            color="secondary"
            sx={{ fontWeight: 'bold' }}
          >
            View All
          </Typography>
        </ButtonBase>
      )}
    </Box>
  );
};

export default memo(CategoryEventSection);
