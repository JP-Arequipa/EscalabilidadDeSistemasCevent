import React from 'react';
import {
  Box,
  Typography,
  Paper,
  ButtonBase,
  Chip,
  Divider,
} from '@mui/material';
import Image from 'next/image';
import { EventHomePageDto } from '@/utils/interfaces/EventInterfaces';
import { routes } from '@/utils/navigation/Routes';
import { useRouter } from 'next/navigation';

interface EventCardPageProps {
  event: EventHomePageDto;
}

export default function EventCardPage({ event }: EventCardPageProps) {
  const router = useRouter();

  return (
    <ButtonBase
      sx={{
        width: '100%',
        marginBottom: 3,
        '&:hover': { transform: 'scale(1.02)' },
        transition: 'transform 0.3s ease-in-out',
      }}
      onClick={() => router.push(`${routes.myEvents}/${event.id}`)}
    >
      <Paper
        elevation={4}
        sx={{
          width: '100%',
          display: 'flex',
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <Box sx={{ flexShrink: 0, width: 300 }}>
          <Image
            width={300}
            height={160}
            src={event.coverPhotoUrl}
            alt={`Cover photo for ${event.name}`}
            style={{ objectFit: 'cover', height: '100%' }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 3,
            flex: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="h2" fontWeight="bold" gutterBottom>
              {event.name}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexDirection: 'row' }}>
              <Chip label={event.category} color="primary" />
              <Chip
                label={new Date(event.eventDate).toLocaleDateString()}
                color="primary"
              />
            </Box>
            <Typography variant="body" color="text.secondary">
              {event.address}
            </Typography>
            <Typography variant="body">{event.shortDescription}</Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Chip
              label={`$${event.ticketPrice.toFixed(2)}`}
              color="primary"
              sx={{
                fontWeight: 'bold',
                fontSize: '1rem',
                padding: '0 8px',
              }}
            />
            <Typography variant="body2" color="text.secondary">
              {event.attendeeCount}{' '}
              {event.attendeeCount === 1 ? 'attendee' : 'attendees'}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </ButtonBase>
  );
}
