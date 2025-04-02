import { UserInterface } from '@/utils/interfaces/UserInterfaces';
import axios from 'axios';

export const getUserById = async (
  id: number | string,
): Promise<UserInterface | null> => {
  try {
    const response = await axios.get(`/api/users/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const registerUser = async (
  user: UserInterface,
): Promise<UserInterface | null> => {
  try {
    const response = await axios.post('/api/users', user);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const updateUser = async (
  user: UserInterface,
): Promise<UserInterface | null> => {
  try {
    const response = await axios.put(`/api/users/${user.id}`, user);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const fetchIdsByEmails = async (
  emails: string[],
): Promise<string[] | null> => {
  try {
    console.log(emails);
    const response = await axios.post<string[]>('/api/users/emails', emails);
    return response.data;
  } catch (error) {
    console.error('Error fetching IDs by emails:', error);
    return null;
  }
};
