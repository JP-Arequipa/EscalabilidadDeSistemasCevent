'use client';
import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import {
  ImageUpload,
  GeneralInfo,
  DateLocation,
  PriceCapacity,
} from '@/components/imports';
import EditEvent from '@/app/edit_event/EditEvent';
import { EventDetailDto, Activity } from '@/utils/interfaces/EventInterfaces';
import styles from '@/app/create_event/_styles/CreateEvent.module.css';

interface DateLocationData {
  date: Date;
  time: string;
  location: string;
  latitude: number | null;
  longitude: number | null;
}

export interface SectionProps {
  event: EventDetailDto;
}

const EditEventSection = ({ event }: SectionProps) => {
  const [generalInfo, setGeneralInfo] = useState({
    title: event.name,
    shortDescription: event.shortDescription,
    description: event.description,
    categoryId: 1,
  });

  const [dateLocation, setDateLocation] = useState<DateLocationData>({
    date: new Date(event.eventDate),
    time: new Date(event.eventDate)
      .toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
      .toString(),
    location: event.address,
    latitude: event.location.latitude,
    longitude: event.location.longitude,
  });

  const [priceCapacity, setPriceCapacity] = useState({
    capacity: event.capacity,
    ticketPrice: event.ticketPrice,
  });

  const [imageData, setImageData] = useState({
    coverPhotoUrl: event.coverPhotoUrl,
  });

  const [activities, setActivities] = useState<Activity[]>(
    event.activities || [],
  );

  const handleImageChange = (data: { coverPhotoUrl: string }) => {
    setImageData(data);
  };

  const handleGeneralInfoComplete = (data: typeof generalInfo) => {
    setGeneralInfo(data);
  };

  const handleDateLocationComplete = (data: typeof dateLocation) => {
    setDateLocation(data);
  };

  const handlePriceCapacityComplete = (data: typeof priceCapacity) => {
    setPriceCapacity(data);
  };

  const handleAddActivity = (newActivity: Activity) => {
    setActivities([...activities, newActivity]);
  };

  const handleEditActivity = (index: number, updatedActivity: Activity) => {
    const updatedActivities = [...activities];
    updatedActivities[index] = updatedActivity;
    setActivities(updatedActivities);
  };

  const handleDeleteActivity = (index: number) => {
    setActivities(activities.filter((_, idx) => idx !== index));
  };

  return (
    <Box className={styles.container} display="flex">
      <Box flex={4} pr={2}>
        <Box mb={2}>
          <Typography variant="h4" fontWeight="bold">
            <span style={{ color: 'black' }}>Edit</span>
            <span style={{ color: '#4a88e9' }}> Event</span>
          </Typography>
        </Box>

        <ImageUpload
          onComplete={handleImageChange}
          initialImage={imageData.coverPhotoUrl}
        />

        <GeneralInfo
          onComplete={handleGeneralInfoComplete}
          initialData={generalInfo}
        />

        <DateLocation
          onComplete={handleDateLocationComplete}
          initialData={dateLocation}
        />

        <PriceCapacity
          onComplete={handlePriceCapacityComplete}
          initialData={priceCapacity}
        />
      </Box>

      <Box flex={1} pl={2}>
        <EditEvent
          eventId={event.id.toString()}
          generalInfo={generalInfo}
          dateLocation={dateLocation}
          priceCapacity={priceCapacity}
          selectedImage={imageData.coverPhotoUrl}
          activities={activities}
          onUpdate={(updatedEvent) => {
            console.log('Event updated:', updatedEvent);
          }}
        />
      </Box>
    </Box>
  );
};

export default EditEventSection;
