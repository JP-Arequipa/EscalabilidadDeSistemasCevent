import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { FaExclamationCircle } from 'react-icons/fa';

const MessageContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#fff8f8',
  border: '1px solid #ffcdd2',
  borderRadius: theme.spacing(2),
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease-in-out',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  margin: '2rem auto',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.15)',
  },
}));

const AnimatedIcon = styled(FaExclamationCircle)({
  fontSize: '4rem',
  color: '#f44336',
  animation: 'pulse 2s infinite',
  '@keyframes pulse': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.1)' },
    '100%': { transform: 'scale(1)' },
  },
});

const TicketMessage = () => {
  return (
    <Container maxWidth="sm">
      <MessageContainer role="alert" aria-live="assertive">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            padding: 4,
          }}
        >
          <AnimatedIcon aria-hidden="true" />
          <Typography
            variant="h4"
            component="h1"
            sx={{
              color: '#d32f2f',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Ticket Not Found or Already Used
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#555',
              textAlign: 'center',
              maxWidth: '500px',
            }}
          >
            This ticket does not exist or has already been redeemed and cannot
            be used again. Please check your ticket details or contact support
            for assistance.
          </Typography>
        </Box>
      </MessageContainer>
    </Container>
  );
};

export default TicketMessage;
