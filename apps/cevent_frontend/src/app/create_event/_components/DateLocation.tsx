import React, { useState, useCallback, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Modal,
  FormHelperText,
} from '@mui/material';
import { CalendarToday, AccessTime, LocationOn } from '@mui/icons-material';
import Calendar from 'react-calendar';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import '../_styles/DateLocation.css';
import {
  validateEventDate,
  validateEventHour,
  validateLocation,
} from '@/utils/Validations';

type DateLocationData = {
  date: Date;
  time: string;
  location: string;
  latitude: number | null;
  longitude: number | null;
};

interface DateLocationProps {
  onComplete: (data: DateLocationData, isComplete: boolean) => void;
  initialData?: Partial<DateLocationData>;
}

const DateLocation = ({ onComplete, initialData = {} }: DateLocationProps) => {
  const [fields, setFields] = useState<DateLocationData>({
    date: initialData.date || new Date(),
    time: initialData.time || '',
    location: initialData.location || '',
    latitude: initialData.latitude || null,
    longitude: initialData.longitude || null,
  });

  const [errors, setErrors] = useState({
    date: '',
    time: '',
    location: '',
  });

  const [mapState, setMapState] = useState({
    openDateModal: false,
    openTimeModal: false,
    mapCenter: {
      lat: initialData.latitude || -17.366198,
      lng: initialData.longitude || -66.175489,
    },
    markerPosition: {
      lat: initialData.latitude || -17.366198,
      lng: initialData.longitude || -66.175489,
    },
  });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
  });

  const validateFields = () => {
    const newErrors = {
      date: validateEventDate(fields.date) || '',
      time: validateEventHour(fields.time) || '',
      location: validateLocation(fields.location) || '',
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  useEffect(() => {
    const isComplete = validateFields();
    onComplete(fields, isComplete);
  }, [fields, onComplete]);

  const handleMarkerDragEnd = useCallback(
    async (event: google.maps.MapMouseEvent) => {
      const lat = event.latLng?.lat();
      const lng = event.latLng?.lng();

      if (lat !== undefined && lng !== undefined) {
        const newPosition = { lat, lng };
        setMapState((prev) => ({
          ...prev,
          markerPosition: newPosition,
        }));

        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
          );
          const data = await response.json();

          if (data.status === 'OK' && data.results && data.results.length > 0) {
            const streetName = data.results[0].formatted_address;
            setFields((prev) => ({
              ...prev,
              location: streetName,
              latitude: lat,
              longitude: lng,
            }));
          } else {
            console.error('Error fetching location data:', data.status);
          }
        } catch (error) {
          console.error(
            'An error occurred while fetching location data:',
            error,
          );
        }
      } else {
        console.error('LatLng is null');
      }
    },
    [],
  );

  const handleChange = (
    field: string,
    value: string | Date | number | null,
  ) => {
    setFields((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMapStateChange = (field: string, value: any) => {
    setMapState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    const lat = e.latLng?.lat();
    const lng = e.latLng?.lng();

    if (lat && lng) {
      setMapState((prev) => ({
        ...prev,
        markerPosition: { lat, lng },
      }));
    } else {
      console.error('LatLng is null');
    }
  };

  return (
    <Box className="info-box">
      <Typography variant="h6" fontWeight="bold" sx={{ color: 'black' }}>
        Date and Location
      </Typography>

      <Box display="flex" gap={2} mt={2}>
        <TextField
          label="Date"
          value={fields.date.toISOString().split('T')[0]}
          onClick={() => handleMapStateChange('openDateModal', true)}
          fullWidth
          InputLabelProps={{ shrink: true }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarToday />
              </InputAdornment>
            ),
            readOnly: true,
          }}
          error={!!errors.date}
        />
        {errors.date && (
          <FormHelperText sx={{ color: 'red', fontSize: '0.75rem' }}>
            {errors.date}
          </FormHelperText>
        )}

        <Modal
          open={mapState.openDateModal}
          onClose={() => handleMapStateChange('openDateModal', false)}
        >
          <Box className="modal-box">
            <Typography variant="h6" sx={{ color: 'black' }}>
              Select Date
            </Typography>
            <Calendar
              onChange={(value) => {
                if (value) {
                  handleChange('date', Array.isArray(value) ? value[0] : value);
                }
                handleMapStateChange('openDateModal', false);
              }}
              value={fields.date}
            />
          </Box>
        </Modal>

        <TextField
          label="Hour"
          value={fields.time}
          onClick={() => handleMapStateChange('openTimeModal', true)}
          fullWidth
          InputLabelProps={{ shrink: true }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccessTime />
              </InputAdornment>
            ),
            readOnly: true,
          }}
          error={!!errors.time}
        />
        {errors.time && (
          <FormHelperText sx={{ color: 'red', fontSize: '0.75rem' }}>
            {errors.time}
          </FormHelperText>
        )}

        <Modal
          open={mapState.openTimeModal}
          onClose={() => handleMapStateChange('openTimeModal', false)}
        >
          <Box className="modal-box">
            <Typography variant="h6" sx={{ color: 'black' }}>
              Select Time
            </Typography>
            <TextField
              label="Time"
              type="time"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={fields.time}
              onChange={(e) => {
                handleChange('time', e.target.value);
                handleMapStateChange('openTimeModal', false);
              }}
              inputProps={{ step: 300 }}
            />
          </Box>
        </Modal>
      </Box>

      <TextField
        label="Location"
        value={fields.location}
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LocationOn />
            </InputAdornment>
          ),
          readOnly: true,
        }}
        error={!!errors.location}
      />
      {errors.location && (
        <FormHelperText sx={{ color: 'red', fontSize: '0.75rem' }}>
          {errors.location}
        </FormHelperText>
      )}

      {isLoaded && (
        <GoogleMap
          center={mapState.mapCenter}
          zoom={15}
          mapContainerStyle={{
            width: '100%',
            height: '300px',
            marginTop: '16px',
          }}
          onClick={handleMapClick}
        >
          <Marker
            position={mapState.markerPosition}
            draggable
            onDragEnd={handleMarkerDragEnd}
          />
        </GoogleMap>
      )}
    </Box>
  );
};

export default DateLocation;
