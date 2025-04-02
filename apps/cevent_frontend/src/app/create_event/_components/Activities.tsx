import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import Delete from '@mui/icons-material/Delete';
import { InputAdornment } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Edit from '@mui/icons-material/Edit';
import { Activity } from '@/utils/interfaces/EventInterfaces';
import {
  validateName,
  validateShortDescription,
  validateEventDate,
  validateCapacity,
} from '@/utils/Validations';
import { ActivityErrors } from '@/utils/interfaces/ActivitiesInterfaces';
import '../_styles/Activities.css';

type ActivitiesProps = {
  initialActivities?: Activity[];
  onAddActivity: (activity: Activity) => void;
  onEditActivity: (index: number, updatedActivity: Activity) => void;
  onDeleteActivity: (index: number) => void;
};

const Activities: React.FC<ActivitiesProps> = ({
  initialActivities = [],
  onAddActivity,
  onEditActivity,
  onDeleteActivity,
}) => {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [activityTitle, setActivityTitle] = useState<string>('');
  const [activityDescription, setActivityDescription] = useState<string>('');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [capacity, setCapacity] = useState<number | string>('');
  const [showActivityInputs, setShowActivityInputs] = useState<boolean>(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState<ActivityErrors>({
    title: '',
    description: '',
    capacity: '',
    startTime: '',
    endTime: '',
  });

  const resetForm = () => {
    setActivityTitle('');
    setActivityDescription('');
    setStartTime(null);
    setEndTime(null);
    setCapacity('');
    setEditingIndex(null);
    setErrors({
      title: '',
      description: '',
      capacity: '',
      startTime: '',
      endTime: '',
    });
  };

  const validateForm = () => {
    const newErrors: any = {};

    const titleError = validateName(activityTitle);
    if (titleError) newErrors.title = titleError;

    const descriptionError = validateShortDescription(activityDescription);
    if (descriptionError) newErrors.description = descriptionError;

    const capacityError = validateCapacity(Number(capacity));
    if (capacityError) newErrors.capacity = capacityError;

    const startTimeError = validateEventDate(startTime!);
    if (startTimeError) newErrors.startTime = startTimeError;

    const endTimeError =
      startTime && endTime && endTime <= startTime
        ? 'End time must be after start time.'
        : '';
    if (endTimeError) newErrors.endTime = endTimeError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    return true;
  };

  const addActivity = () => {
    if (validateForm()) {
      const parsedCapacity =
        typeof capacity === 'string' ? parseInt(capacity) || 0 : capacity;

      const newActivity: Activity = {
        name: activityTitle,
        description: activityDescription,
        startTime: startTime ? startTime : new Date(),
        endTime: endTime ? endTime : new Date(),
        status: 1,
        capacity: parsedCapacity,
      };

      onAddActivity(newActivity);
      setActivities((prevActivities) => [...prevActivities, newActivity]);
      resetForm();
      setShowActivityInputs(false);
    }
  };

  const deleteActivity = (index: number) => {
    onDeleteActivity(index);
    setActivities((prevActivities) =>
      prevActivities.filter((_, i) => i !== index),
    );
  };

  const editActivity = (index: number) => {
    const activityToEdit = activities[index];
    setActivityTitle(activityToEdit.name);
    setActivityDescription(activityToEdit.description);
    setStartTime(activityToEdit.startTime);
    setEndTime(activityToEdit.endTime);
    setCapacity(activityToEdit.capacity);
    setEditingIndex(index);
    setShowActivityInputs(true);
  };

  const saveEditedActivity = () => {
    if (validateForm() && editingIndex !== null) {
      const updatedActivity: Activity = {
        name: activityTitle,
        description: activityDescription,
        startTime: startTime ? startTime : new Date(),
        endTime: endTime ? endTime : new Date(),
        status: 1,
        capacity:
          typeof capacity === 'string' ? parseInt(capacity) || 0 : capacity,
      };

      onEditActivity(editingIndex, updatedActivity);
      setActivities((prevActivities) => {
        const updatedActivities = [...prevActivities];
        updatedActivities[editingIndex] = updatedActivity;
        return updatedActivities;
      });
      resetForm();
      setShowActivityInputs(false);
    }
  };

  return (
    <Box className="info-box">
      <Typography variant="h6" className="activity-title">
        Activities
      </Typography>
      <Typography sx={{ marginBottom: 2 }}>
        Keep your event schedule organized by adding activities and notifying
        users when they are about to start.
      </Typography>

      <Button
        startIcon={showActivityInputs ? <Remove /> : <Add />}
        onClick={() => setShowActivityInputs(!showActivityInputs)}
        className="add-activity-button"
        variant="outlined"
      >
        {showActivityInputs ? 'Cancel Add Activity' : 'Add Activity'}
      </Button>

      {showActivityInputs && (
        <Box className="activity-input">
          <TextField
            label="Title"
            fullWidth
            value={activityTitle}
            onChange={(e) => setActivityTitle(e.target.value)}
            margin="normal"
            InputProps={{
              style: { color: 'black' },
            }}
          />
          {errors.title && (
            <Typography
              variant="body2"
              sx={{ color: 'red', fontSize: '8px', marginTop: '4px' }}
            >
              {errors.title}
            </Typography>
          )}

          <TextField
            label="Add Description"
            fullWidth
            value={activityDescription}
            onChange={(e) => setActivityDescription(e.target.value)}
            margin="normal"
            InputProps={{
              style: { color: 'black' },
            }}
          />
          {errors.description && (
            <Typography
              variant="body2"
              sx={{ color: 'red', fontSize: '8px', marginTop: '4px' }}
            >
              {errors.description}
            </Typography>
          )}

          <Box
            display="flex"
            justifyContent="space-between"
            gap={2}
            marginTop={2}
          >
            <TextField
              label="Capacity"
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              fullWidth
              InputProps={{
                style: { color: 'black' },
              }}
              sx={{ flex: 1 }}
            />
            {errors.capacity && (
              <Typography
                variant="body2"
                sx={{ color: 'red', fontSize: '8px', marginTop: '4px' }}
              >
                {errors.capacity}
              </Typography>
            )}

            <TextField
              label="Start Time"
              type="datetime-local"
              onChange={(e) => setStartTime(new Date(e.target.value))}
              fullWidth
              InputProps={{
                style: { color: 'black' },
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarTodayIcon style={{ color: 'black' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ flex: 1 }}
            />
            {errors.startTime && (
              <Typography
                variant="body2"
                sx={{ color: 'red', fontSize: '8px', marginTop: '4px' }}
              >
                {errors.startTime}
              </Typography>
            )}

            <TextField
              label="End Time"
              type="datetime-local"
              onChange={(e) => setEndTime(new Date(e.target.value))}
              fullWidth
              InputProps={{
                style: { color: 'black' },
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarTodayIcon style={{ color: 'black' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ flex: 1 }}
            />
            {errors.endTime && (
              <Typography
                variant="body2"
                sx={{ color: 'red', fontSize: '8px', marginTop: '4px' }}
              >
                {errors.endTime}
              </Typography>
            )}
          </Box>

          <Button
            onClick={editingIndex !== null ? saveEditedActivity : addActivity}
            variant="contained"
            className="add-activity-action"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            {editingIndex !== null ? 'Save Activity' : 'Add Activity'}
          </Button>
        </Box>
      )}

      {activities.length > 0 && (
        <Box mt={2}>
          <Typography variant="subtitle1" className="added-activities-title">
            Added Activities:
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            {activities.map((activity, index) => (
              <Box
                key={index}
                className="activity-item"
                sx={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '10px',
                }}
              >
                <Typography variant="h6">{activity.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {activity.description}
                </Typography>
                <Typography variant="body2">
                  {activity.startTime?.toLocaleString()}
                </Typography>
                <Typography variant="body2">
                  {activity.endTime?.toLocaleString()}
                </Typography>
                <Typography variant="body2">
                  Capacity: {activity.capacity}
                </Typography>

                <Box display="flex" gap={1}>
                  <Button
                    onClick={() => editActivity(index)}
                    variant="outlined"
                    size="small"
                    startIcon={<Edit />}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => deleteActivity(index)}
                    variant="outlined"
                    size="small"
                    color="error"
                    startIcon={<Delete />}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Activities;
