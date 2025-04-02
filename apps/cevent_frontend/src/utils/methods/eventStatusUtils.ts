export const EventStatus = {
  Pending: 1,
  Cancelled: 2,
  Postponed: 3,
  InProgress: 4,
  Completed: 5,
  OnHold: 6,
} as const;

export type EventStatusKey = keyof typeof EventStatus;
export type EventStatusValue = (typeof EventStatus)[EventStatusKey];

export const getStatusString = (status: number): string => {
  const statusMap: Record<number, string> = {
    [EventStatus.Pending]: 'Pending',
    [EventStatus.Cancelled]: 'Cancelled',
    [EventStatus.Postponed]: 'Postponed',
    [EventStatus.InProgress]: 'In Progress',
    [EventStatus.Completed]: 'Completed',
    [EventStatus.OnHold]: 'On Hold',
  };
  return statusMap[status] || 'Unknown';
};

export const getStatusNumber = (status: string): number => {
  const reverseStatusMap: Record<string, number> = {
    Pending: EventStatus.Pending,
    Cancelled: EventStatus.Cancelled,
    Postponed: EventStatus.Postponed,
    'In Progress': EventStatus.InProgress,
    Completed: EventStatus.Completed,
    'On Hold': EventStatus.OnHold,
  };
  return reverseStatusMap[status] || 0;
};

export const getCurrentTime = (): string => {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const period = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12;

  return `${hours}:${minutes} ${period}`;
};

export const getCurrentDateTimeForSystem = (): string => {
  return new Date().toISOString();
};
