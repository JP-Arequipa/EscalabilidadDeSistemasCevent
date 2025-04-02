import { Session } from 'next-auth';
import { getServerSession } from 'next-auth';
import { authOptions } from '../app/api/auth/[...nextauth]/route';
import { decrypt } from './encription';

interface CustomSession extends Session {
  access_token?: string;
  id_token?: string;
}

export async function getAccessToken(): Promise<string | null> {
  const session = (await getServerSession(authOptions)) as CustomSession;
  if (session && session.access_token) {
    const accessTokenDecrypted = decrypt(session.access_token);
    return accessTokenDecrypted;
  }
  return null;
}

export async function getIdToken(): Promise<string | null> {
  const session = (await getServerSession(authOptions)) as CustomSession;
  if (session && session.id_token) {
    const idTokenDecrypted = decrypt(session.id_token);
    return idTokenDecrypted;
  }
  return null;
}
