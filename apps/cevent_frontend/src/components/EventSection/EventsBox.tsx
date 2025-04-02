import { Box } from '@mui/material';
import CardEvent from '../CardEvent';
import { EventHomePageDto } from '@/utils/interfaces/EventInterfaces';
import Grid from '@mui/material/Grid2';
import { memo } from 'react';

const EventsBox = ({ events }: { events: EventHomePageDto[] }) => {
  return (
    <Box sx={{ flexGrow: 1, marginTop: 3 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 1, sm: 8, md: 12 }}
      >
        {events.map((value, index) => (
          <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
            <CardEvent eventData={value} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default memo(EventsBox);
