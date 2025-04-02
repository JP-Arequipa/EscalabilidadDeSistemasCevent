export function validateName(title: string): string | null {
  if (!title) return 'Event name is required.';
  if (title.length < 10) return 'Title must be at least 10 characters long.';
  if (title.length > 100) return 'Event Title must not exceed 100 characters.';
  return null;
}

export function validateShortDescription(
  shortDescription: string,
): string | null {
  if (!shortDescription) return 'Short description is required.';
  if (shortDescription.length < 10)
    return 'Description must be at least 10 characters long.';
  if (shortDescription.length > 250)
    return 'Short description must not exceed 250 characters.';
  return null;
}

export function validateDescription(description: string): string | null {
  if (!description) return 'Description is required.';
  if (description.length < 20)
    return 'Description must be at least 20 characters long.';
  return null;
}

export function validateEventDate(eventDate: Date): string | null {
  if (!eventDate) return 'Enter the date of the event.';
  if (eventDate < new Date()) return 'Event date must be in the future.';
  return null;
}

export function validateEventHour(eventDate: string): string | null {
  if (!eventDate) return 'Enter the time of the event.';
  return null;
}

export function validateLocation(location: any): string | null {
  if (!location)
    return 'Choose a place on the map for the location of the event.';
  return null;
}

export function validateVenue(venue: string): string | null {
  if (!venue) return 'Venue is required.';
  if (venue.length > 150) return 'Venue must not exceed 150 characters.';
  return null;
}

export function validateCapacity(capacity: number): number {
  if (capacity === undefined || capacity === null) return 1;
  if (capacity === 0) return 2;
  if (capacity < 0) return 3;
  return 0;
}

export function validateTicketPrice(ticketPrice: number): number {
  if (ticketPrice === undefined || ticketPrice === null) return 1;
  if (ticketPrice === 0) return 2;
  if (ticketPrice < 0) return 3;
  return 0;
}
