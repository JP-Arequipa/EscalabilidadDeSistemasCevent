import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Stack,
  Box,
  CardActionArea,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import { extractWordByComma, formatDate } from '@/utils/methods/stringMethods';
import styles from '@/styles/components/CardEventStyles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useRouter } from 'next/navigation';

export interface EventSearchToUserDto {
  id: number;
  name: string;
  coverPhotoUrl: string;
  eventDate: Date;
  venue: string;
  shortDescription: string;
  capacity: number;
  ticketPrice: number;
  ticketCount?: number;
  address: string;
  category: string;
}

interface TicketCardProps {
  event: EventSearchToUserDto;
}

export default function TicketCard({ event }: TicketCardProps) {
  const router = useRouter();
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        boxShadow: 3,
        position: 'relative',
      }}
      onClick={() => {
        router.push(`/my_tickets/${event.id}`);
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={event.coverPhotoUrl}
          alt={event.name}
          sx={{
            position: 'relative',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 100,
            right: 8,
            zIndex: 1,
            height: 'auto',
            padding: '5px',
            display: 'flex',
            flexDirection: 'row',
            gap: 1,
          }}
        >
          {(event.ticketCount ?? 0) >= 1 && (
            <Chip
              label={
                <>
                  <ConfirmationNumberOutlinedIcon
                    sx={{
                      fontSize: 14,
                      mr: 0.5,
                      verticalAlign: 'middle',
                    }}
                    color="primary"
                  />
                  {event.ticketCount}
                </>
              }
              sx={{
                ml: 1,
                backgroundColor: 'white',
                height: '24px',
              }}
            />
          )}

          <Chip
            label={`$${event.ticketPrice}`}
            color="primary"
            sx={{
              height: '24px',
            }}
          />
        </Box>

        <CardContent>
          <Typography variant="bodyLarge" sx={{ fontWeight: 'bold' }}>
            {event.name}
          </Typography>
          <Stack direction="row" spacing={1} mb={1}>
            <Chip label={event.category} color="primary" size="small" />
            <Chip
              icon={<EventIcon color="primary" sx={{ fontSize: 16 }} />}
              label={formatDate(event.eventDate)}
              sx={styles.chipEventDateStyles}
            />
            <Chip
              icon={<LocationOnIcon color="primary" sx={{ fontSize: 16 }} />}
              label={extractWordByComma(event.address, 2)}
              sx={styles.chipLocationStyles}
            />
          </Stack>
          <Typography variant="body2" color="text.secondary">
            {event.shortDescription}
          </Typography>
          <Box
            mt={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          ></Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
