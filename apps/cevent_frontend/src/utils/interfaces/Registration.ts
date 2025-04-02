export interface RegistrationInputDto {
  name: string;
  lastName: string;
  phoneNumber: string;
  eventId: number;
  ticketId: string;
  email: string;
}

export interface RegistrationOutputDto extends RegistrationInputDto {
  id: number;
  createdAt: Date;
  attendanceStatus: number;
}

export interface UpdateStatusRegistration {
  attendanceStatus: number;
}
