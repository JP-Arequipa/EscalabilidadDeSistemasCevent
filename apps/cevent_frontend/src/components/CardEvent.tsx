import { EventHomePageDto } from '@/utils/interfaces/EventInterfaces';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Typography,
  Box,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import {
  extractWordByComma,
  formatDate,
  truncateText,
} from '@/utils/methods/stringMethods';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import styles from '@/styles/components/CardEventStyles';
import { useRouter } from 'next/navigation';

interface CardEventProps {
  eventData: EventHomePageDto;
}

const CardEvent = ({ eventData }: CardEventProps) => {
  const router = useRouter();
  return (
    <Card sx={styles.cardStyles}>
      <CardActionArea onClick={() => router.push(`/${eventData.id}`)}>
        <CardMedia
          component="img"
          height="140"
          image={eventData.coverPhotoUrl}
          alt={eventData.name}
        />
        <Chip
          icon={<PeopleOutlineIcon color="primary" sx={{ fontSize: 16 }} />}
          label={eventData.attendeeCount}
          sx={styles.chipAttendeeCountStyles}
        />
        <Chip
          icon={<AttachMoneyIcon sx={{ fontSize: 16 }} />}
          label={eventData.ticketPrice}
          color="primary"
          sx={styles.chipPriceStyles}
        />
        <CardContent sx={styles.cardContentStyles}>
          <Typography variant="bodyLarge" sx={{ fontWeight: 'bold' }}>
            {eventData.name}
          </Typography>
          <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Chip
              color="primary"
              label={eventData.category}
              sx={styles.chipCategoryStyles}
            />
            <Chip
              icon={<EventIcon color="primary" sx={{ fontSize: 16 }} />}
              label={formatDate(eventData.eventDate)}
              sx={styles.chipEventDateStyles}
            />
            <Chip
              icon={<LocationOnIcon color="primary" sx={{ fontSize: 16 }} />}
              label={extractWordByComma(eventData.address, 2)}
              sx={styles.chipLocationStyles}
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            {truncateText(eventData.shortDescription, 120)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardEvent;
