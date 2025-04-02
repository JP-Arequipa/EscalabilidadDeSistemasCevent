import { RegistrationInputDto } from '@/utils/interfaces/Registration';

export interface TicketRedeemFormData extends RegistrationInputDto {
  code?: string;
}

export interface ValidationErrors {
  name?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
}
