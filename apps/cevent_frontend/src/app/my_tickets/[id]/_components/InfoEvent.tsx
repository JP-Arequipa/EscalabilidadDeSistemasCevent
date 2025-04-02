import { EventDetailDto, statusData } from '@/utils/interfaces/EventInterfaces';
import { Box, Typography } from '@mui/material';
import styles from '../_styles/InfoEventStyles';
import Image from 'next/image';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import { fullFormatDate } from '@/utils/methods/stringMethods';
import RotateRightOutlinedIcon from '@mui/icons-material/RotateRightOutlined';
import OrganizerInfo from '@/app/[id]/_components/OrganizerInfo';
import { useEffect, useState } from 'react';
import { UserInterface } from '@/utils/interfaces/UserInterfaces';
import { getUserById } from '@/services/UserService';
interface InfoEventProps {
  eventData: EventDetailDto;
}

const InfoEvent = ({ eventData }: InfoEventProps) => {
  const [organizerUser, setOrganizerUser] = useState<UserInterface>();

  useEffect(() => {
    getUserById(eventData.organizerUserId).then((data) => {
      if (data) setOrganizerUser(data);
    });
  }, []);
  return (
    <Box sx={styles.mainContainer}>
      <Image
        src={eventData.coverPhotoUrl}
        alt={eventData.name}
        width={300}
        height={170}
        style={{ borderRadius: 12 }}
      />
      <Box sx={styles.dataEventContainer}>
        <Typography variant="h1">{eventData.name}</Typography>
        <Box sx={styles.dataRow}>
          <CalendarMonthOutlinedIcon color="primary" />
          <Typography variant="bodyLarge">
            {fullFormatDate(eventData.eventDate).replace('at', '|')}
          </Typography>
        </Box>
        <Box sx={styles.dataRow}>
          <FmdGoodOutlinedIcon color="primary" />
          <Typography variant="bodyLarge">{eventData.address}</Typography>
        </Box>
        <Box sx={styles.dataRow}>
          <RotateRightOutlinedIcon color="primary" />
          <Typography variant="bodyLarge">
            {statusData[eventData.status]}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default InfoEvent;
