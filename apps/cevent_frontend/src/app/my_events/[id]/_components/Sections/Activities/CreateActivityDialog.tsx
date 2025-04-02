import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
} from '@mui/material';
import { z } from 'zod';
import { EventActivityDto } from '@/utils/interfaces/EventActivities';
import { createEventActivity } from '@/services/EventService';
import { getCurrentDateTimeForSystem } from '@/utils/methods/eventStatusUtils';

const eventActivitySchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'Activity name is required.' })
      .max(100, { message: 'Activity name must not exceed 100 characters.' }),
    description: z
      .string()
      .min(20, { message: 'Description must be at least 20 characters long.' })
      .max(500, { message: 'Description must not exceed 500 characters.' }),
    startTime: z.string().refine((value) => new Date(value) >= new Date(), {
      message: 'Start time must be in the future.',
    }),
    endTime: z.string(),
    lastStatusUpdate: z.string(),
    status: z.number().min(1).max(6),
    capacity: z
      .number()
      .int()
      .min(0, { message: 'Capacity must be zero or positive.' }),
  })
  .refine((data) => new Date(data.endTime) > new Date(data.startTime), {
    message: 'End time must be after the start time.',
    path: ['endTime'],
  });

interface CreateActivityDialogProps {
  open: boolean;
  onClose: () => void;
  onActivityCreated: (activity: any) => void;
  eventId: string;
}

const CreateActivityDialog: React.FC<CreateActivityDialogProps> = ({
  open,
  onClose,
  onActivityCreated,
  eventId,
}) => {
  const [formData, setFormData] = useState<EventActivityDto>({
    name: '',
    description: '',
    startTime: '',
    endTime: '',
    status: 1,
    capacity: 0,
    lastStatusUpdate: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange =
    (field: keyof EventActivityDto) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [field]:
          field === 'capacity' || field === 'status'
            ? +event.target.value
            : event.target.value,
      });
    };

  const handleSubmit = async () => {
    try {
      const validatedData = eventActivitySchema.parse(formData);
      validatedData.lastStatusUpdate = getCurrentDateTimeForSystem();
      const createdActivity = await createEventActivity(eventId, validatedData);
      if (createdActivity) {
        onActivityCreated(createdActivity);
        setFormData({
          name: '',
          description: '',
          startTime: '',
          endTime: '',
          status: 1,
          capacity: 0,
          lastStatusUpdate: getCurrentDateTimeForSystem(),
        });
        onClose();
      } else {
        console.error('Failed to create activity');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((e) => {
          if (e.path[0]) fieldErrors[e.path[0].toString()] = e.message;
        });
        setErrors(fieldErrors);
      } else {
        console.error('Error creating activity:', error);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Activity</DialogTitle>
      <DialogContent>
        <TextField
          label="Activity Name"
          fullWidth
          value={formData.name}
          onChange={handleChange('name')}
          margin="normal"
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Description"
          fullWidth
          value={formData.description}
          onChange={handleChange('description')}
          margin="normal"
          error={!!errors.description}
          helperText={errors.description}
        />
        <TextField
          label="Start Time"
          type="datetime-local"
          fullWidth
          value={formData.startTime}
          onChange={handleChange('startTime')}
          margin="normal"
          InputLabelProps={{ shrink: true }}
          error={!!errors.startTime}
          helperText={errors.startTime}
        />
        <TextField
          label="End Time"
          type="datetime-local"
          fullWidth
          value={formData.endTime}
          onChange={handleChange('endTime')}
          margin="normal"
          InputLabelProps={{ shrink: true }}
          error={!!errors.endTime}
          helperText={errors.endTime}
        />
        <TextField
          label="Status"
          select
          fullWidth
          value={formData.status}
          onChange={handleChange('status')}
          margin="normal"
          error={!!errors.status}
          helperText={errors.status}
        >
          <MenuItem value={1}>Pending</MenuItem>
          <MenuItem value={2}>Cancelled</MenuItem>
          <MenuItem value={3}>Postponed</MenuItem>
          <MenuItem value={4}>In Progress</MenuItem>
          <MenuItem value={5}>Completed</MenuItem>
          <MenuItem value={6}>On Hold</MenuItem>
        </TextField>
        <TextField
          label="Capacity"
          type="number"
          fullWidth
          value={formData.capacity}
          onChange={handleChange('capacity')}
          margin="normal"
          error={!!errors.capacity}
          helperText={errors.capacity}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateActivityDialog;
