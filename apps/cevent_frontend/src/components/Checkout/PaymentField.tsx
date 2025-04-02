import { updatePromoteStatusEvent } from '@/services/EventService';
import { DOMAIN } from '@/utils/constans';
import { Button } from '@mui/material';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useRef, useState } from 'react';

interface PaymentFieldProps {
  callBackFunction: () => Promise<boolean>;
  setSnackBarMessage: (message: string) => void;
  setOpenSnackBar: (open: boolean) => void;
  setStatusOperation: (status: boolean) => void;
}
const PaymentField = ({
  callBackFunction,
  setSnackBarMessage,
  setOpenSnackBar,
  setStatusOperation,
}: PaymentFieldProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isDataSending, setIsDataSending] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    setIsDataSending(true);
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const response = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${DOMAIN}/my_events`,
      },
      redirect: 'if_required',
    });

    if (response.error) {
      setStatusOperation(false);
      setSnackBarMessage('Error processing payment');
      setOpenSnackBar(true);
      setIsDataSending(false);
    } else {
      setStatusOperation(true);
      setSnackBarMessage('Payment processed successfully');
      setOpenSnackBar(true);
      setTimeout(async () => {
        await callBackFunction();
      }, 2500);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button
        type="submit"
        sx={{ marginTop: 2, width: '100%' }}
        variant="contained"
        disabled={!stripe || isDataSending}
      >
        Pay
      </Button>
    </form>
  );
};

export default PaymentField;
