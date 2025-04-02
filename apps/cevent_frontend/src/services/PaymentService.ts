import { PaymentInterface } from '@/utils/interfaces/Payment';
import axios from 'axios';

export const getAccessPayment = async (
  payment: PaymentInterface,
): Promise<string | null> => {
  try {
    const response = await axios.post('/api/payment', payment);
    return response.data.client_secret;
  } catch (error) {
    return null;
  }
};
