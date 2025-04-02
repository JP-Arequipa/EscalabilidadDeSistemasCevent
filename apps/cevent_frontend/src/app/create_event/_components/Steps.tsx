import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  IconButton,
  TextField,
  Button,
} from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import { createEvent } from '@/utils/../services/EventService';
import '../_styles/Steps.css';
import { EventInputDto, Activity } from '@/utils/interfaces/EventInterfaces';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { messageOfRequest } from '@/utils/messageOfRequest';
import { routes } from '@/utils/navigation/Routes';
import AddCollaborators, {
  Collaborator,
} from './collaborators/AddCollaborators';
import { fetchIdsByEmails } from '@/services/UserService';

export interface GeneralInfoProps {
  title: string;
  shortDescription: string;
  description: string;
  categoryId: number;
}

export interface DateLocationProps {
  date?: Date;
  time?: string;
  location?: string;
  latitude?: number | null;
  longitude?: number | null;
}

export interface PriceCapacityProps {
  capacity: number;
  ticketPrice: number;
}

const Steps = ({
  generalInfo,
  dateLocation,
  priceCapacity,
  selectedImage,
  activities,
}: {
  generalInfo: GeneralInfoProps;
  dateLocation: DateLocationProps;
  priceCapacity: PriceCapacityProps;
  selectedImage: string | null;
  activities: Activity[];
}) => {
  const [isGeneralInfoComplete, setIsGeneralInfoComplete] = useState(false);
  const [isDateLocationComplete, setIsDateLocationComplete] = useState(false);
  const [isPriceCapacityComplete, setIsPriceCapacityComplete] = useState(false);
  const [coOrganizers, setCoOrganizers] = useState<string[]>([]);

  const router = useRouter();

  useEffect(() => {
    setIsGeneralInfoComplete(
      !!(
        generalInfo?.title &&
        generalInfo?.shortDescription &&
        generalInfo?.description &&
        generalInfo?.categoryId
      ),
    );
    setIsDateLocationComplete(
      !!(
        dateLocation?.date &&
        dateLocation?.time &&
        dateLocation?.location &&
        dateLocation?.latitude &&
        dateLocation?.longitude
      ),
    );
    setIsPriceCapacityComplete(
      !!(priceCapacity?.capacity && priceCapacity?.ticketPrice),
    );
  }, [generalInfo, dateLocation, priceCapacity, activities]);

  const user = useSelector((state: RootState) => state.user.userInfo);

  const handleCollaboratorsSubmit = async (collaborators: Collaborator[]) => {
    const emails = collaborators.map((collaborator) => collaborator.email);
    try {
      const ids = await fetchIdsByEmails(emails);
      if (ids) {
        setCoOrganizers(ids);
      } else {
        console.error('Failed to fetch IDs for emails');
      }
    } catch (error) {
      console.error('Error in handleCollaboratorsSubmit:', error);
    }
  };

  const handleSubmit = async () => {
    if (
      isGeneralInfoComplete &&
      isDateLocationComplete &&
      isPriceCapacityComplete
    ) {
      const eventData: EventInputDto = {
        name: generalInfo.title ?? '',
        shortDescription: generalInfo.shortDescription ?? '',
        description: generalInfo.description ?? '',
        categoryId: generalInfo.categoryId ?? 0,
        eventDate: dateLocation.date ?? new Date(),
        location: {
          latitude: dateLocation.latitude ?? 0,
          longitude: dateLocation.longitude ?? 0,
        },
        venue: dateLocation.location || '',
        ticketPrice: priceCapacity.ticketPrice,
        coverPhotoUrl:
          selectedImage ||
          'https://i.postimg.cc/XvfZ2cSP/47b39a54d7fa589dd5cf851ee1d2fb61.jpg',
        attendanceTrackingEnabled: false,
        status: 1,
        capacity: priceCapacity.capacity,
        organizerUserId: user?.id ?? '',
        createdAt: new Date(),
        address: dateLocation.location || '',
        attendeeCount: 0,
        activities,
        coOrganizers,
      };

      try {
        const response = await createEvent(eventData);
        if (response === null) {
          messageOfRequest.logEventCreationError(response);
        } else {
          router.push('/my_events');
        }
      } catch (error) {
        messageOfRequest.logUnexpectedError(error);
      }
    } else {
      messageOfRequest.logCompletionMessage();
      1;
    }
  };

  return (
    <Box mb={4} p={3}>
      <Box mb={4} p={3} className="step-container">
        <Typography variant="h6" className="checkbox-label">
          Steps
        </Typography>

        <FormControlLabel
          control={<Checkbox checked={isGeneralInfoComplete} />}
          label="General information"
        />
        <FormControlLabel
          control={<Checkbox checked={isDateLocationComplete} />}
          label="Date and location"
        />
        <FormControlLabel
          control={<Checkbox checked={isPriceCapacityComplete} />}
          label="Price and capacity"
        />
      </Box>
      <AddCollaborators onAddCollaborators={handleCollaboratorsSubmit} />

      <Box className="reminder-container">
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
            className="create-event-button"
            onClick={handleSubmit}
            disabled={
              !(
                isGeneralInfoComplete &&
                isDateLocationComplete &&
                isPriceCapacityComplete
              )
            }
          >
            Create Event
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Steps;
