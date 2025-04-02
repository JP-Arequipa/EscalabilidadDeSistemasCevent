import { Box, Button, ButtonBase, Chip, Typography } from '@mui/material';
import styles from '@/styles/components/MiniBannerStyles';
import { EventHomePageDto } from '@/utils/interfaces/EventInterfaces';
import Image from 'next/image';
import { formatDate, truncateText } from '@/utils/methods/stringMethods';
import EventIcon from '@mui/icons-material/Event';
import { useRouter } from 'next/navigation';

const MiniBannerEvent = ({ event }: { event: EventHomePageDto }) => {
  const router = useRouter();
  const handleRedirect = () => {
    router.push(`/${event.id}`);
  };

  return (
    <ButtonBase sx={styles.mainContainer} onClick={handleRedirect}>
      <Box sx={styles.imageContainer}>
        <Image
          src={event.coverPhotoUrl}
          alt={event.name}
          layout="fill"
          objectFit="cover"
        />
      </Box>
      <Box sx={styles.dataEventContainer}>
        <Box sx={styles.dataContainer}>
          <Typography variant="h3" sx={styles.textTitle}>
            {event.name.toUpperCase()}
          </Typography>
          <Box sx={styles.chipContainer}>
            <Chip color="primary" label={event.category} />
            <Chip
              icon={<EventIcon color="primary" sx={{ fontSize: 16 }} />}
              label={formatDate(event.eventDate)}
              sx={styles.dateChip}
            />
          </Box>
          <Typography variant="body" sx={styles.textDescription}>
            {truncateText(event.shortDescription, 200)}
          </Typography>
          <Box sx={styles.buttonMoreInfo}>
            <Typography variant="body" sx={styles.textMoreInfo}>
              More info
            </Typography>
          </Box>
        </Box>
      </Box>
    </ButtonBase>
  );
};

export default MiniBannerEvent;
