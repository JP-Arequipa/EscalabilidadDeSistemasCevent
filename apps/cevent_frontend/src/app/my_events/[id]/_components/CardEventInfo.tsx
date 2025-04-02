import { EventDetailDto } from '@/utils/interfaces/EventInterfaces';
import { Box, Typography } from '@mui/material';

interface CardEventInfoProps {
  eventData: EventDetailDto;
}
//TODO: Implement CardEventSummary
const CardEventSummary = ({ eventData }: CardEventInfoProps) => {
  return (
    <Box>
      <Typography variant="h6">{eventData.name}</Typography>
      <Typography variant="body1">{eventData.description}</Typography>
      <Typography variant="body1">{eventData.venue}</Typography>
      <Typography variant="body1">{eventData.address}</Typography>
    </Box>
  );
};

export default CardEventSummary;
