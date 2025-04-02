'use client';

import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Divider,
  Button,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import styles from '@/styles/components/EventModalStyles';
import { EventDetailDto } from '@/utils/interfaces/EventInterfaces';

interface EventModalProps {
  open: boolean;
  onClose: () => void;
  eventData: EventDetailDto;
  pricePerTicket: number;
  capacity: number;
}

const TicketModal = ({
  open,
  onClose,
  eventData,
  pricePerTicket,
  capacity,
}: EventModalProps) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) {
      setError('Please enter a valid number.');
      return;
    } else if (parseInt(value, 10) > capacity) {
      setError(`Only ${capacity} tickets are available.`);
    } else {
      setError('');
    }

    setQuantity(value);
  };

  const calculateTotal = () => {
    const qty = parseInt(quantity, 10) || 0;
    return qty * pricePerTicket;
  };

  const handleConfirmPurchase = () => {
    const qty = parseInt(quantity, 10);
    if (qty > 0 && qty <= capacity) {
      router.push(`/checkout?eventId=${eventData.id}&quantity=${qty}`);
    }
  };

  const handleCloseModal = () => {
    setQuantity('');
    setError('');
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={styles.modalBox}>
        <Typography id="modal-title" sx={styles.modalTitle}>
          Buy Tickets
        </Typography>

        <Typography variant="body1">Enter quantity of tickets:</Typography>
        <TextField
          fullWidth
          placeholder="Your Quantity"
          value={quantity}
          onChange={handleQuantityChange}
          error={!!error}
          helperText={error}
          sx={styles.textField}
        />

        <Box sx={styles.ticketsInfoContainer}>
          <Typography variant="body2">
            {eventData.name} (x{quantity || 0})
          </Typography>
          <Typography variant="body2">{pricePerTicket} USD</Typography>
        </Box>

        <Divider sx={styles.divider} />

        <Box sx={styles.ticketsInfoContainer}>
          <Typography variant="body2">Subtotal</Typography>
          <Typography variant="body2">{calculateTotal()} USD</Typography>
        </Box>

        <Divider sx={styles.divider} />

        <Box sx={styles.totalContainer}>
          <Typography>Total</Typography>
          <Typography>{calculateTotal()} USD</Typography>
        </Box>

        <Box sx={styles.buttonContainer}>
          <Button
            variant="outlined"
            sx={styles.cancelButton}
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={styles.checkoutButton}
            disabled={!quantity || !!error}
            onClick={handleConfirmPurchase}
          >
            Go to checkout
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TicketModal;
