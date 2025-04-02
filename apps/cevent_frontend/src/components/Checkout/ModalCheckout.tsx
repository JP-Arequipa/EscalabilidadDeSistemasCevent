import { Box, Modal, Typography } from '@mui/material';
import { styleModal } from '@/styles/components/ModalCheckoutStyles';
import PaymentForm from './PaymentForm';
import './../../styles/components/customScroll.css';
import { CURRENCY_PROMOTION, PRICE_PROMOTION } from '@/utils/constans';
interface ModalCheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  callBackFunction: () => Promise<boolean>;
  linkToRedirect: string;
}

const ModalCheckout = ({
  isOpen,
  onClose,
  callBackFunction,
  linkToRedirect,
}: ModalCheckoutProps) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleModal.container}>
        <Typography variant="h1">Checkout</Typography>
        <Box sx={styleModal.boxRow}>
          <Box sx={styleModal.boxColumn}>
            <Typography variant="h3">Details</Typography>
            <Box sx={styleModal.boxDetails}>
              <Typography fontWeight={300} variant="body">
                Promotion
              </Typography>
              <Typography fontWeight={300} variant="body">
                ${PRICE_PROMOTION}
              </Typography>
            </Box>
            <Box sx={styleModal.line}></Box>
            <Box sx={styleModal.boxDetails}>
              <Typography variant="h3">Total</Typography>
              <Typography fontWeight={300} variant="h3">
                ${PRICE_PROMOTION}
              </Typography>
            </Box>
          </Box>
          <Box className="custom-scrollbar" sx={styleModal.containerCheckout}>
            <PaymentForm
              callBackFunction={callBackFunction}
              linkToRedirect={linkToRedirect}
              paymentInterface={{
                amount: PRICE_PROMOTION,
                currency: CURRENCY_PROMOTION,
              }}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
export default ModalCheckout;
