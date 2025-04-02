import { getAccessPayment } from '@/services/PaymentService';
import { PaymentInterface } from '@/utils/interfaces/Payment';
import {
  Alert,
  Box,
  LinearProgress,
  Snackbar,
  Typography,
} from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import PaymentField from './PaymentField';
import { useRouter } from 'next/navigation';
import { CURRENCY_PROMOTION, DOMAIN, PRICE_PROMOTION } from '@/utils/constans';
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string,
);

interface PaymentFormProps {
  callBackFunction: () => Promise<boolean>;
  linkToRedirect: string;
  paymentInterface: PaymentInterface;
}

const PaymentForm = ({
  callBackFunction,
  linkToRedirect,
  paymentInterface,
}: PaymentFormProps) => {
  const [secretKey, setSecretKey] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const options = {
    clientSecret: secretKey,
  };

  const [snackBarMessage, setSnackBarMessage] = useState<string>('');
  const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);
  const [statusOperation, setStatusOperation] = useState<boolean>(false);

  useEffect(() => {
    const paymentOpion: PaymentInterface = {
      amount: parseFloat((paymentInterface.amount * 100).toFixed(0)),
      currency: CURRENCY_PROMOTION,
    };
    getAccessPayment(paymentOpion)
      .then((clientSecret) => {
        if (clientSecret) {
          setSecretKey(clientSecret);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handlePayment = async (): Promise<boolean> => {
    let attempts = 0;
    let response = false;

    while (attempts < 3) {
      response = await callBackFunction();
      if (response) {
        const currentUrl = window.location.href.replace(DOMAIN, '');
        if (linkToRedirect === currentUrl) {
          window.location.reload();
        } else {
          router.push(linkToRedirect);
        }
        return true;
      }
      attempts++;
    }

    return false;
  };

  return loading ? (
    <Box sx={{ height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          flexDirection: 'column',
        }}
      >
        <Typography color="primary" variant="body">
          Loading the checkout
        </Typography>
        <Box sx={{ width: '100%', mt: 2 }}>
          <LinearProgress />
        </Box>
      </Box>
    </Box>
  ) : (
    <>
      <Elements stripe={stripePromise} options={options}>
        <PaymentField
          callBackFunction={handlePayment}
          setSnackBarMessage={setSnackBarMessage}
          setOpenSnackBar={setOpenSnackBar}
          setStatusOperation={setStatusOperation}
        />
      </Elements>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackBar(false)}
      >
        <Alert
          onClose={() => setOpenSnackBar(false)}
          severity={statusOperation ? 'success' : 'error'}
          sx={{ width: '100%' }}
          variant="filled"
        >
          {snackBarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PaymentForm;
