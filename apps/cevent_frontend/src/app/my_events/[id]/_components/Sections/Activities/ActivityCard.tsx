import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, IconButton } from '@mui/material';
import StatusDropdown from './ActivityStatusDropdown';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDialog from './ConfirmationActivityDIalog';
import { deleteEventActivity } from '@/services/EventService';

interface ActivityCardProps {
  id: string;
  activityId: string;
  title: string;
  description: string;
  status: string;
  startTime: string;
  endTime: string;
  onStatusChange: (newStatus: string) => void;
  lastStatusChange: string | null;
  onDelete: (activityId: string) => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  description,
  status,
  startTime,
  endTime,
  onStatusChange,
  lastStatusChange,
  id,
  activityId,
  onDelete,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const isDefaultDate = () => {
    if (!lastStatusChange) return true;
    return lastStatusChange === '0001-01-01T00:00:00';
  };

  const handleConfirmDelete = async () => {
    try {
      const deletedActivity = await deleteEventActivity(id, activityId);
      if (deletedActivity) {
        onDelete(activityId);
        console.log('Activity successfully deleted:', deletedActivity);
      } else {
        console.error('Failed to delete the activity.');
      }
    } catch (error) {
      console.error('An error occurred while deleting the activity:', error);
    } finally {
      setIsDialogOpen(false);
    }
  };
  return (
    <Card
      sx={{ mb: 3, backgroundColor: '#f9f9f9', borderRadius: 2, boxShadow: 2 }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="body2" color="secondary">
              {startTime.split(', ')[1]} - {endTime.split(', ')[1]}
            </Typography>
            <Typography variant="h6" color="primary">
              <strong>{title}</strong>
            </Typography>

            <Typography variant="body2" color="secondary" sx={{ mb: 1 }}>
              {description}
            </Typography>
            <IconButton onClick={handleOpenDialog} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
            gap="0.5rem"
          >
            <StatusDropdown currentStatus={status} onChange={onStatusChange} />
            <Typography variant="body2" color="secondary">
              Last Status Update
            </Typography>
            <Typography variant="body2" color="primary">
              <strong>
                {isDefaultDate()
                  ? 'Status not modified yet'
                  : new Date(lastStatusChange!).toLocaleString()}
              </strong>
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <ConfirmDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this activity?"
        title="Confirm Activity Deletion"
      />
    </Card>
  );
};

export default ActivityCard;
