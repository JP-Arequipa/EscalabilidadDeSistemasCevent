import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useState } from 'react';
import { Activity } from '@/utils/interfaces/EventInterfaces';

interface AttendanceModalProps {
  open: boolean;
  onClose: () => void;
  onRegisterAttendance: (
    type: 'event' | 'activity',
    activityId?: number,
  ) => void;
  userId: string;
  activities: Activity[];
}

const AttendanceModal = ({
  open,
  onClose,
  onRegisterAttendance,
  userId,
  activities,
}: AttendanceModalProps) => {
  const [showActivities, setShowActivities] = useState(false);

  const handleActivitySelection = (activityId: number) => {
    onRegisterAttendance('activity', activityId);
    setShowActivities(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Register Attendance</DialogTitle>
      <DialogContent>
        {!showActivities ? (
          <Typography>
            The ticket belongs to user <strong>{userId}</strong>. Would you like
            to register attendance for the event or for an activity?
          </Typography>
        ) : (
          <List>
            {activities.map((activity) => (
              <ListItem key={activity.id}>
                <ListItemButton
                  onClick={() => {
                    if (activity.id !== undefined) {
                      handleActivitySelection(activity.id);
                    }
                  }}
                >
                  <ListItemText
                    primary={activity.name}
                    secondary={`${activity.startTime} - ${activity.endTime}`}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        {!showActivities ? (
          <>
            <Button
              onClick={() => onRegisterAttendance('event')}
              color="primary"
              variant="contained"
            >
              Event
            </Button>
            <Button
              onClick={() => setShowActivities(true)}
              color="secondary"
              variant="contained"
            >
              Activity
            </Button>
            <Button onClick={onClose} color="inherit">
              Cancel
            </Button>
          </>
        ) : (
          <Button onClick={() => setShowActivities(false)} color="inherit">
            Back
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AttendanceModal;
