import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, IconButton } from '@mui/material';
import { updateEvent } from '@/services/EventService';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { messageOfRequest } from '@/utils/messageOfRequest';
import { EventInputDto, Activity } from '@/utils/interfaces/EventInterfaces';
import {
  GeneralInfoProps,
  DateLocationProps,
  PriceCapacityProps,
} from '@/app/create_event/_components/Steps';
import { AddCircleOutline } from '@mui/icons-material';
import '@/app/edit_event/EditEvent.css';

const EditEvent = ({
  eventId,
  generalInfo,
  dateLocation,
  priceCapacity,
  selectedImage,
  activities,
  onUpdate,
}: {
  eventId: string;
  generalInfo: GeneralInfoProps;
  dateLocation: DateLocationProps;
  priceCapacity: PriceCapacityProps;
  selectedImage: string | null;
  activities: Activity[];
  onUpdate: (updatedEvent: EventInputDto) => void;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.userInfo);

  const handleUpdate = async () => {
    if (!user?.id) {
      console.log('Error: User not found.');
      return;
    }

    const updatedEvent: EventInputDto = {
      name: generalInfo.title || '',
      shortDescription: generalInfo.shortDescription || '',
      description: generalInfo.description || '',
      categoryId: generalInfo.categoryId || 0,
      eventDate: dateLocation.date || new Date(),
      location: {
        latitude: dateLocation.latitude || 0,
        longitude: dateLocation.longitude || 0,
      },
      venue: dateLocation.location || '',
      ticketPrice: priceCapacity.ticketPrice,
      coverPhotoUrl: selectedImage || '',
      attendanceTrackingEnabled: false,
      status: 1,
      capacity: priceCapacity.capacity,
      organizerUserId: user.id,
      createdAt: new Date(),
      address: dateLocation.location || '',
      attendeeCount: 0,
      activities,
    };

    try {
      setIsSubmitting(true);
      const response = await updateEvent(
        eventId,
        updatedEvent,
        updatedEvent.organizerUserId,
      );
      if (response) {
        console.log('Event updated successfully:', response);
        onUpdate(updatedEvent);
        router.push('/my_events');
      } else {
        console.log('Error updating event:', response);
      }
    } catch (error) {
      messageOfRequest.logUnexpectedError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box className="reminder-container">
      <Box mt={4} p={2}>
        <Typography variant="h6" className="checkbox-label">
          Add Collaborators
        </Typography>
        <Box display="flex" alignItems="center" mt={2}>
          <IconButton color="primary">
            <AddCircleOutline fontSize="large" />
          </IconButton>
        </Box>
      </Box>

      <Box mt={4} p={2}>
        <Typography variant="h6" className="checkbox-label">
          Set Reminder
        </Typography>
        <TextField
          label="Reminder message"
          fullWidth
          margin="normal"
          variant="outlined"
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="update-event-button"
          onClick={handleUpdate}
          disabled={isSubmitting}
          sx={{ mt: 4 }}
        >
          {isSubmitting ? 'Updating...' : 'Update Event'}
        </Button>
      </Box>
    </Box>
  );
};

export default EditEvent;
