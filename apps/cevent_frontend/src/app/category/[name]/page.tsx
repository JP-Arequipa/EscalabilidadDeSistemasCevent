'use client';
import EmptyEventSection from '@/components/EventSection/EmptyEventSection';
import EventsBox from '@/components/EventSection/EventsBox';
import SkeletonEventsBox from '@/components/EventSection/SkeletonEventsBox';
import Layout from '@/components/Layout';
import { fetchHomePageEvents } from '@/services/EventService';
import {
  EventFilter,
  EventHomePageDto,
  SortOptions,
} from '@/utils/interfaces/EventInterfaces';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const CategoryPage = () => {
  const params = useParams();
  const categoryName: string = Array.isArray(params.name)
    ? params.name[0]
    : params.name;
  const [events, setEvents] = useState<EventHomePageDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<SortOptions>(SortOptions.EventDate);
  const [IsDescending, setIsDescending] = useState<boolean>(true);
  const DESCENDING = 1;
  const ASCENDING = 0;

  const fetchEvents = (page: number) => {
    const filters: EventFilter = {
      page: page,
      pageSize: 12,
      Category: categoryName,
      IsDescending: IsDescending,
      SortBy: sortBy,
    };
    setLoading(true);
    fetchHomePageEvents(filters)
      .then((data) => {
        if (data.length === 0) {
          setHasMore(false);
        } else {
          setEvents((prevEvents) => [...prevEvents, ...data]);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEvents(page);
  }, [categoryName, page, sortBy, IsDescending]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        loading ||
        !hasMore
      )
        return;
      setPage((prevPage) => prevPage + 1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  const resetEvents = () => {
    setEvents([]);
    setPage(1);
  };

  return (
    <Layout>
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography color="primary" variant="h1">
            {categoryName}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <FormControl>
              <InputLabel id="sort-by">Sort By</InputLabel>
              <Select
                sx={{ color: 'black' }}
                label="Sort By"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as SortOptions);
                  resetEvents();
                }}
              >
                {Object.values(SortOptions).map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="sort">Sort</InputLabel>
              <Select
                label="Sort"
                value={IsDescending ? DESCENDING : ASCENDING}
                onChange={(e) => {
                  setIsDescending(Number(e.target.value) === DESCENDING);
                  resetEvents();
                }}
              >
                <MenuItem value={DESCENDING}>Descending</MenuItem>
                <MenuItem value={ASCENDING}>Ascending</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {events.length === 0 && !loading ? (
          <EmptyEventSection />
        ) : (
          <EventsBox events={events} />
        )}
        {loading && <SkeletonEventsBox />}
      </Box>
    </Layout>
  );
};

export default CategoryPage;
