import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, InputAdornment } from '@mui/material';
import { AttachMoney } from '@mui/icons-material';
import {
  FieldsPriceCapacity,
  PriceCapacityProps,
} from '@/utils/interfaces/CreateEvent';
import '../_styles/PriceCapacity.css';
import { validateCapacity, validateTicketPrice } from '@/utils/Validations';

const PriceCapacity: React.FC<
  PriceCapacityProps & { initialData?: FieldsPriceCapacity }
> = ({ onComplete, initialData }) => {
  const [fields, setFields] = useState<FieldsPriceCapacity>({
    capacity: initialData?.capacity || 0,
    ticketPrice: initialData?.ticketPrice || 0,
  });

  const [errors, setErrors] = useState<Partial<FieldsPriceCapacity>>({
    capacity: 0,
    ticketPrice: 0,
  });

  useEffect(() => {
    const { capacity, ticketPrice } = fields;
    const isComplete =
      !errors.capacity &&
      !errors.ticketPrice &&
      fields.capacity > 0 &&
      fields.ticketPrice > 0;
    onComplete(fields, isComplete);
  }, [fields, errors, onComplete]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = parseFloat(value);
    setFields((prevFields) => ({
      ...prevFields,
      [name]: parsedValue,
    }));

    let errorValue = 0;
    if (name === 'capacity') {
      errorValue = validateCapacity(parsedValue);
      setErrors((prevErrors) => ({
        ...prevErrors,
        capacity: errorValue,
      }));
    }

    if (name === 'ticketPrice') {
      errorValue = validateTicketPrice(parsedValue);
      setErrors((prevErrors) => ({
        ...prevErrors,
        ticketPrice: errorValue,
      }));
    }
  };

  const getErrorMessage = (error: number) => {
    switch (error) {
      case 1:
        return 'Enter the capacity of the event.';
      case 2:
        return 'Capacity cannot be zero';
      case 3:
        return 'Capacity must be zero or positive.';
      case 4:
        return 'Ticket price is required.';
      case 5:
        return 'Ticket price cannot be zero';
      case 6:
        return 'Ticket price must be zero or positive.';
      default:
        return '';
    }
  };

  return (
    <Box className="info-box">
      <Typography variant="h6" fontWeight="bold">
        Price and Capacity
      </Typography>
      <Box display="flex" gap={2} mt={2}>
        <Box flex={1}>
          <TextField
            label="Capacity"
            type="number"
            fullWidth
            margin="normal"
            name="capacity"
            value={fields.capacity}
            onChange={handleChange}
            InputProps={{
              className: 'input-field',
            }}
            inputProps={{
              'aria-label': 'Capacity',
              'aria-required': 'true',
            }}
            error={errors.capacity !== 0}
          />
          {errors.capacity !== 0 && (
            <Typography
              variant="body2"
              color="error"
              style={{ fontSize: '8px', marginTop: '4px' }}
            >
              {getErrorMessage(errors.capacity || 0)}
            </Typography>
          )}
        </Box>
        <Box flex={1}>
          <TextField
            label="Ticket Price"
            type="number"
            fullWidth
            margin="normal"
            name="ticketPrice"
            value={fields.ticketPrice}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoney />
                </InputAdornment>
              ),
              className: 'input-field',
            }}
            inputProps={{
              'aria-label': 'Ticket Price',
              'aria-required': 'true',
            }}
            error={errors.ticketPrice !== 0}
          />
          {errors.ticketPrice !== 0 && (
            <Typography
              variant="body2"
              color="error"
              style={{ fontSize: '8px', marginTop: '4px' }}
            >
              {getErrorMessage(errors.ticketPrice || 0)}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PriceCapacity;
