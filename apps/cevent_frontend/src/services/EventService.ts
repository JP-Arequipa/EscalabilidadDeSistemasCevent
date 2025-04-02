import axios from 'axios';
import {
  EventClickDto,
  EventDetailDto,
  EventFilter,
  EventHomePageDto,
  EventInputDto,
  EventSearchToUserDto,
  EventStatus,
  EventEditlDto,
} from '@/utils/interfaces/EventInterfaces';
import { PromoteEventDto } from '@/utils/interfaces/Promotions';
import { EventsStadistic } from '@/utils/interfaces/EventStadistic';
import {
  EventActivity,
  EventActivityDto,
} from '@/utils/interfaces/EventActivities';
import { NextResponse } from 'next/server';

const BASE_URL = process.env.NEXTAUTH_URL || '';

/**
 * Fetches the events for the home page
 *
 * @param filter object containing filter options
 * @returns an array of events
 */
export const fetchHomePageEvents = async (
  filter: EventFilter,
): Promise<EventHomePageDto[]> => {
  try {
    const params = {
      page: filter.page,
      pageSize: filter.pageSize,
      Category: filter.Category,
      StartDate: filter.StartDate,
      EndDate: filter.EndDate,
      MinPrice: filter.MinPrice,
      MaxPrice: filter.MaxPrice,
      Status: filter.Status,
      SortBy: filter.SortBy,
      IsDescending: filter.IsDescending,
      IsPromoted: filter.IsPromoted,
      OrganizerUserId: filter.OrganizerUserId,
    };

    const response = await axios.get<EventHomePageDto[]>(
      '/api/events/homepage',
      { params },
    );

    return response.data;
  } catch (error) {
    return [];
  }
};

export const getEventById = async (
  id: string,
): Promise<EventDetailDto | null> => {
  try {
    const response = await axios.get<EventDetailDto>(`/api/events/${id}`);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const fetchAllEvents = async (): Promise<EventSearchToUserDto[]> => {
  try {
    const response =
      await axios.get<EventSearchToUserDto[]>('/api/events/list');
    return response.data;
  } catch (error) {
    return [];
  }
};

export const fetchBannerEvents = async (
  category: string,
): Promise<EventHomePageDto[]> => {
  try {
    const params = {
      page: 1,
      pageSize: 10,
    };
    const response = await axios.get<EventHomePageDto[]>(
      `/api/events/banner/${category}`,
      { params },
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createClickedEvent = async (
  data: EventClickDto,
): Promise<void> => {
  try {
    const response = await axios.post('api/events/clicks', data);
  } catch (error) {
    console.error(error);
  }
};

/**
 * Creates a new event
 *
 * @param eventData object containing the event data
 * @returns the created event or null in case of an error
 */
export const createEvent = async (
  eventData: EventInputDto,
): Promise<EventInputDto | null> => {
  try {
    const response = await axios.post<EventInputDto>(
      '/api/events/list',
      eventData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.status === 201) {
      return response.data;
    }

    return null;
  } catch (error) {
    return null;
  }
};

/**
 * Updates the status of an event
 *
 * @param eventPromoteDto object containing the event id and the new status
 * @returns true if the status was updated successfully, false otherwise
 */
export const updatePromoteStatusEvent = async (
  eventPromoteDto: PromoteEventDto,
): Promise<boolean> => {
  try {
    const response = await axios.post(
      '/api/events/promotion',
      eventPromoteDto,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return response.status === 201;
  } catch (error) {
    return false;
  }
};

/**
 *  Fetches the stadistics of the events
 *
 * @returns event stadistics object
 */
export const getEventStadistics = async (): Promise<EventsStadistic | null> => {
  try {
    const response = await axios.get<EventsStadistic>(
      '/api/events/audit/eventsStadistics',
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

export const updateStatusEvent = async (
  eventState: EventStatus,
  eventId: number,
): Promise<boolean> => {
  try {
    const response = await axios.post(
      '/api/events/status/' + eventId,
      eventState,
    );

    return response.status === 201;
  } catch (error) {
    return false;
  }
};

export const getEventsByIds = async (
  eventsIds: number[],
): Promise<EventSearchToUserDto[]> => {
  try {
    const response = await axios.post<EventSearchToUserDto[]>(
      '/api/events/list/ids',
      { ids: eventsIds },
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 *  Fetches the activities of the events
 *
 * @returns Event activities object
 */
export const getEventActivities = async (
  id: string,
  status: string,
): Promise<EventActivity[] | null> => {
  try {
    const apiUrl = `${BASE_URL}/api/events/${id}/activities?status=${status}`;
    const response = await axios.get<EventActivity[]>(apiUrl);
    return response.data || [];
  } catch (error) {
    console.error('Failed to fetch event activities:', error);
    return [];
  }
};

export const updateEventActivity = async (
  id: string,
  activityId: string,
  updatedActivity: EventActivityDto,
): Promise<EventActivity | null> => {
  try {
    const apiUrl = `${BASE_URL}/api/events/${id}/activities/${activityId}`;
    const response = await axios.put<EventActivity>(apiUrl, updatedActivity);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Failed to update event activity:',
        error.response?.data || error.message,
      );
    } else {
      console.error('An unexpected error occurred:', error);
    }
    return null;
  }
};

export const createEventActivity = async (
  id: string,
  newActivity: EventActivityDto,
): Promise<EventActivity | null> => {
  try {
    const apiUrl = `${BASE_URL}/api/events/${id}/activities`;
    const response = await axios.post<EventActivity>(apiUrl, newActivity, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Failed to create event activity:',
        error.response?.data || error.message,
      );
    } else {
      console.error('An unexpected error occurred:', error);
    }
    return null;
  }
};

export const deleteEventActivity = async (
  id: string,
  activityId: string,
): Promise<EventActivity | null> => {
  try {
    const apiUrl = `${BASE_URL}/api/events/${id}/activities/${activityId}`;
    const response = await axios.delete<EventActivity>(apiUrl, {
      headers: { accept: 'text/plain' },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Failed to delete event activity:',
        error.response?.data || error.message,
      );
    } else {
      console.error('An unexpected error occurred:', error);
    }
    return null;
  }
};

/**
 * Updates an existing event
 *
 * @param eventId ID of the event to update
 * @param updatedEvent Object containing the updated event data
 * @param userId Owner's ID of the event
 * @returns the updated event or null in case of an error
 */
export const updateEvent = async (
  eventId: string,
  updatedEvent: EventInputDto,
  userId: string,
): Promise<EventInputDto | null> => {
  try {
    const apiUrl = `/api/events/${eventId}`;

    const response = await axios.put<EventInputDto>(apiUrl, updatedEvent, {
      headers: {
        'Content-Type': 'application/json',
        userId: userId,
      },
    });

    if (response.status === 200) {
      return response.data;
    }

    return null;
  } catch (error) {
    console.error('Failed to update event:', error);
    return null;
  }
};
