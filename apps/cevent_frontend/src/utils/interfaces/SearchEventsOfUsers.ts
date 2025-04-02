export interface Location {
  longitude: number;
  latitude: number;
}

export interface EventDTO {
  id: number;
  name: string;
  location: Location;
  venue: string;
  attendees: number;
  activities: number;
  description?: string;
  price?: number;
  organizerUserId: string;
  createdAt: Date;
  coverPhotoUrl: string;
}
