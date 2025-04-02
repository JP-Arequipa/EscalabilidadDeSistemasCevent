import Layout from '@/components/Layout';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import BannerPromotion from '../Promotions/BannerPromotion';
import { EventDetailDto } from '@/utils/interfaces/EventInterfaces';

interface PromoteEventSectionProps {
  event: EventDetailDto;
}

const PromoteEventSection = ({ event }: PromoteEventSectionProps) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Layout>
        <Box display="flex" flexDirection="row" sx={{ width: '100%' }} gap={2}>
          <Typography variant="display" color="primary">
            Promote
          </Typography>
          <Typography variant="display">Event</Typography>
        </Box>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="promote event tabs"
          >
            <Tab label="Banner promotions" />
          </Tabs>
        </Box>
        <Box sx={{ padding: 2 }}>
          {value === 0 && <BannerPromotion eventData={event} />}
        </Box>
      </Layout>
    </Box>
  );
};

export default PromoteEventSection;
