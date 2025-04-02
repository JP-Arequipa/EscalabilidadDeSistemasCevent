import { EventCategory } from './Categories';

export interface Location {
  longitude: number;
  latitude: number;
}

export interface Activity {
  id?: number;
  name: string;
  description: string;
  startTime: Date;
  endTime: Date;
  status: number;
  capacity: number;
}

export interface ActivityIdDTO {
  ActivityId: number;
  name: string;
  description: string;
  startTime: Date;
  endTime: Date;
  status: number;
  capacity: number;
}

export interface EventHomePageDto {
  id: number;
  name: string;
  category: string;
  eventDate: Date;
  address: string;
  ticketPrice: number;
  attendeeCount: number;
  shortDescription: string;
  coverPhotoUrl: string;
}
export interface EventDetailDto extends Omit<EventHomePageDto, 'category'> {
  location: Location;
  venue: string;
  attendanceTrackingEnabled: boolean;
  status: number;
  capacity: number;
  organizerUserId: string;
  createdAt: Date;
  category: EventCategory;
  categoryId: number;
  description: string;
  isPromoted?: boolean;
  address: string;
  activities: Activity[];
  coOrganizers: string[];
}

export interface EventDetailActivitiesDto
  extends Omit<EventDetailDto, 'activities'> {
  activities: ActivityIdDTO[];
}

export interface EventEditlDto extends Omit<EventHomePageDto, 'category'> {
  location: Location;
  venue: string;
  attendanceTrackingEnabled: boolean;
  status: number;
  capacity: number;
  organizerUserId: string;
  createdAt: Date;
  category: EventCategory;
  description: string;
  isPromoted?: boolean;
  address: string;
  activities: Activity[];
  coOrganizers: string[];
}

export interface EventSearchToUserDto
  extends Omit<EventHomePageDto, 'category'> {
  location: Location;
  venue: string;
  attendanceTrackingEnabled: boolean;
  status: string;
  capacity: number;
  organizerUserId: string;
  createdAt: Date;
  category: string;
  description: string;
  activities: number;
  ticketCount?: number;
  address: string;
}

export enum SortOptions {
  EventDate = 'EventDate',
  TicketPrice = 'TicketPrice',
  AttendeeCount = 'AttendeeCount',
}

export interface EventFilter {
  Category?: string;
  StartDate?: string;
  EndDate?: string;
  MinPrice?: number;
  MaxPrice?: number;
  Status?: string;
  SortBy?: SortOptions;
  IsDescending?: boolean;
  page?: number;
  pageSize?: number;
  IsPromoted?: boolean;
  OrganizerUserId?: string;
}

export interface EventInputDto {
  name: string;
  shortDescription: string;
  description: string;
  categoryId: number;
  eventDate: Date;
  location: Location;
  venue: string;
  ticketPrice: number;
  coverPhotoUrl: string;
  attendanceTrackingEnabled: boolean;
  status: number;
  capacity: number;
  organizerUserId: string;
  createdAt: Date;
  address: string;
  attendeeCount: number;
  activities: Activity[];
  coOrganizers?: string[];
}

export enum SizeBanner {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
}

export interface Size {
  width: number;
  height: number;
}

export const sizeBannerObj: Record<SizeBanner, Size> = {
  Small: { width: 300, height: 300 },
  Medium: { width: 960, height: 540 },
  Large: { width: 1920, height: 1080 },
};

export interface EventClickDto {
  eventId: number;
  userId: string;
}

export interface EventStatus {
  categoryId?: number;
  status?: number;
  isPromoted?: boolean;
  attendeeCount?: number;
}

export const statusData: Record<number, string> = {
  0: 'Pending',
  1: 'Pending',
  2: 'Cancelled',
  3: 'Postponed',
  4: 'In Progress',
  5: 'Completed',
  6: 'On Hold',
};

export interface AttendanceData {
  userId: string;
  activityId: number;
}
