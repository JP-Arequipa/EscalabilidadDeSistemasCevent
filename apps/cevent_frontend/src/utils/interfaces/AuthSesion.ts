import { Session } from 'next-auth';

export interface CustomSession extends Session {
  error?: string;
  userId?: string;
  accessToken?: string;
}
