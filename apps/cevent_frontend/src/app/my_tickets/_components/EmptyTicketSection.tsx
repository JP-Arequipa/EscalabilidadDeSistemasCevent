import { Box, Typography } from '@mui/material';
import Image from 'next/image';

const EmptyTicketSection = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '1rem',
        alignItems: 'center',
        height: '200px',
      }}
    >
      <Image
        src="https://i.postimg.cc/XJssnvgV/7117865-3371469-1.png"
        alt="No Tickets"
        width={150}
        height={150}
      />
      <Typography variant="bodyLarge" color="primary">
        No tickets found
      </Typography>
    </Box>
  );
};

export default EmptyTicketSection;
