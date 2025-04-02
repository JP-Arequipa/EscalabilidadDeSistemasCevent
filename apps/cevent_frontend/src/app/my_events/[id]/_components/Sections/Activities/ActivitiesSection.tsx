import React, { useCallback, useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Button } from '@mui/material';

import {
  getEventActivities,
  updateEventActivity,
} from '@/services/EventService';

import {
  EventStatus,
  getStatusString,
  getStatusNumber,
  getCurrentDateTimeForSystem,
} from '@/utils/methods/eventStatusUtils';
import {
  EventActivity,
  EventActivityDto,
  ActivitiesSectionProps,
  ActivitiesState,
  DialogState,
} from '@/utils/interfaces/EventActivities';

import { ActivityCard } from './ActivityCard';
import ConfirmDialog from './ConfirmationActivityDIalog';
import { StatusSectionHeader } from './StatusSectionHeader';
import CreateActivityButton from './CreateActivityButton';
import BackToMyEvents from './BackToEvents';

const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({ id }) => {
  const [state, setState] = useState<ActivitiesState>({
    activitiesByStatus: {},
    loading: true,
    lastStatusChangeMap: {},
  });

  const [dialogState, setDialogState] = useState<DialogState>({
    open: false,
    selectedActivity: null,
    newStatus: 0,
  });

  const fetchActivities = useCallback(async () => {
    try {
      const statuses = Object.values(EventStatus);
      const results = await Promise.all(
        statuses.map((status) =>
          getEventActivities(id, status.toString()).then((activities) => ({
            status,
            activities,
          })),
        ),
      );

      setState((prev) => ({
        ...prev,
        activitiesByStatus: results.reduce(
          (acc, { status, activities }) => {
            acc[status] = activities || [];
            return acc;
          },
          {} as Record<number, EventActivity[]>,
        ),
        loading: false,
      }));
    } catch (error) {
      console.error('Failed to fetch activities:', error);
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, [id]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const handleStatusChange = useCallback(
    (activity: EventActivity, status: number) => {
      const currentTime = getCurrentDateTimeForSystem();

      setState((prev) => ({
        ...prev,
        lastStatusChangeMap: {
          ...prev.lastStatusChangeMap,
          [activity.id]: currentTime,
        },
      }));

      setDialogState({
        open: true,
        selectedActivity: { ...activity },
        newStatus: status,
      });
    },
    [],
  );

  const handleStatusChangeConfirm = useCallback(async () => {
    const { selectedActivity, newStatus } = dialogState;
    if (!selectedActivity) return;

    try {
      const currentTime = getCurrentDateTimeForSystem();

      const updatedActivity: EventActivityDto = {
        ...selectedActivity,
        status: newStatus,
        lastStatusUpdate: currentTime,
      };

      const updated = await updateEventActivity(
        id,
        selectedActivity.id.toString(),
        updatedActivity,
      );

      if (updated) {
        setState((prev) => {
          const newActivitiesByStatus = { ...prev.activitiesByStatus };

          newActivitiesByStatus[selectedActivity.status] =
            newActivitiesByStatus[selectedActivity.status].filter(
              (a) => a.id !== selectedActivity.id,
            );

          newActivitiesByStatus[newStatus] = [
            ...(newActivitiesByStatus[newStatus] || []),
            updated,
          ];

          const newLastStatusChangeMap = {
            ...prev.lastStatusChangeMap,
            [selectedActivity.id]: updated.lastStatusUpdate,
          };

          return {
            ...prev,
            activitiesByStatus: newActivitiesByStatus,
            lastStatusChangeMap: newLastStatusChangeMap,
          };
        });
      }
    } catch (error) {
      console.error('Failed to update activity status:', error);
    } finally {
      setDialogState((prev) => ({ ...prev, open: false }));
    }
  }, [id, dialogState]);
  const handleActivityDelete = useCallback((activityId: string) => {
    setState((prev) => {
      const newActivitiesByStatus: Record<number, EventActivity[]> = {
        ...prev.activitiesByStatus,
      };
      Object.keys(newActivitiesByStatus).forEach((statusKey) => {
        const status = Number(statusKey);
        newActivitiesByStatus[status] = newActivitiesByStatus[status].filter(
          (activity: EventActivity) => activity.id.toString() !== activityId,
        );
      });

      return { ...prev, activitiesByStatus: newActivitiesByStatus };
    });
  }, []);

  const renderActivities = (status: number) => {
    const activities = state.activitiesByStatus[status];
    if (!activities || activities.length === 0) {
      return (
        <Typography sx={{ color: 'rgba(0, 0, 0, 0.5)' }}>
          No activities found for this status.
        </Typography>
      );
    }
    return activities.map((activity) => (
      <ActivityCard
        key={activity.id}
        title={activity.name}
        description={activity.description}
        status={getStatusString(activity.status)}
        startTime={new Date(activity.startTime).toLocaleString()}
        endTime={new Date(activity.endTime).toLocaleString()}
        onStatusChange={(status) =>
          handleStatusChange(activity, getStatusNumber(status))
        }
        lastStatusChange={
          state.lastStatusChangeMap[activity.id] || activity.lastStatusUpdate
        }
        id={activity.eventId.toString()}
        activityId={activity.id.toString()}
        onDelete={handleActivityDelete}
      />
    ));
  };

  const renderActivitiesSection = () => {
    return Object.entries(EventStatus).map(([key, status]) => (
      <Box key={status} mt={4}>
        <StatusSectionHeader status={status as number} />
        <Box>{renderActivities(status as number)}</Box>
      </Box>
    ));
  };

  const handleOnCloseDialog = useCallback(() => {
    const { selectedActivity } = dialogState;
    if (!selectedActivity) return;

    setState((prev) => {
      const originalStatus = selectedActivity.status;
      return {
        ...prev,
        activitiesByStatus: {
          ...prev.activitiesByStatus,
          [originalStatus]: [
            ...(prev.activitiesByStatus[originalStatus] || []),
            selectedActivity,
          ],
          [dialogState.newStatus]: prev.activitiesByStatus[
            dialogState.newStatus
          ].filter((a) => a.id !== selectedActivity.id),
        },
      };
    });

    setDialogState({ open: false, selectedActivity: null, newStatus: 0 });
  }, [dialogState]);

  const addActivityToState = (
    prevState: ActivitiesState,
    activity: EventActivity,
    status: number,
  ): ActivitiesState => {
    return {
      ...prevState,
      activitiesByStatus: {
        ...prevState.activitiesByStatus,
        [status]: [...(prevState.activitiesByStatus[status] || []), activity],
      },
    };
  };

  const handleActivityCreated = (activity: EventActivity) => {
    setState((prev) => addActivityToState(prev, activity, activity.status));
  };

  if (state.loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="300px"
        width="100%"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '16px',
        mt: 8,
        mb: 8,
        backgroundColor: '#fafafa',
        borderRadius: 2,
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        position: 'relative',
      }}
    >
      <Box
        mb={4}
        textAlign="left"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="nowrap"
      >
        <Box>
          <Typography color="primary" variant="display">
            Activities{' '}
          </Typography>
          <Typography variant="display">Section</Typography>
        </Box>
        <BackToMyEvents />
      </Box>
      <CreateActivityButton
        onActivityCreated={handleActivityCreated}
        eventId={id}
      />

      {renderActivitiesSection()}

      <ConfirmDialog
        open={dialogState.open}
        onClose={handleOnCloseDialog}
        onConfirm={handleStatusChangeConfirm}
        message="Are you sure you want to change the status of this activity?"
        title="Confirm Status Change"
      />
    </Box>
  );
};

export default ActivitiesSection;
