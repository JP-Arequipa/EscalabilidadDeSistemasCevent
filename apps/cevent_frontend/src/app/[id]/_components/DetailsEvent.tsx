import { EventDetailDto } from '@/utils/interfaces/EventInterfaces';
import { UserInterface } from '@/utils/interfaces/UserInterfaces';
import { Box, Typography } from '@mui/material';
import OrganizerInfo from './OrganizerInfo';
import { styleEventDetail } from '@/styles/components/EventPageStyles';
import { useEffect, useState } from 'react';
import { getUserById } from '@/services/UserService';
interface DetailsEventProps {
  event: EventDetailDto;
}
const DetailsEvent = ({ event }: DetailsEventProps) => {
  const [userOrganizer, setUserOrganizer] = useState<UserInterface>();
  useEffect(() => {
    getUserById(event.organizerUserId).then((data) => {
      if (data) setUserOrganizer(data);
    });
  }, []);

  return (
    <Box sx={styleEventDetail.container}>
      <Box>
        <Typography gutterBottom variant="h3">
          Event Details
        </Typography>
        <Typography variant="body">{event.description}</Typography>
      </Box>
      <Box>
        {userOrganizer ? (
          <OrganizerInfo organizerType="Event Organizer" user={userOrganizer} />
        ) : null}
      </Box>
    </Box>
  );
};

export default DetailsEvent;
