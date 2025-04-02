export interface TicketRequestDto {
  eventId: number;
  userId: string;
}

export interface TicketValidatedDto {
  ticketId: string;
  qrContent: string;
  eventId: number;
  isUsed: boolean;
}
