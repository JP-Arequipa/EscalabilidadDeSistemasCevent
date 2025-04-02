export interface EventActivity {
  id: number;
  eventId: number;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  status: number;
  capacity: number;
  lastStatusUpdate: string;
}

export interface EventActivityDto {
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  status: number;
  capacity: number;
  lastStatusUpdate: string;
}

export interface ActivitiesSectionProps {
  id: string;
}

export interface ActivitiesState {
  activitiesByStatus: Record<number, EventActivity[]>;
  loading: boolean;
  lastStatusChangeMap: Record<number, string>;
}

export interface DialogState {
  open: boolean;
  selectedActivity: EventActivity | null;
  newStatus: number;
}
