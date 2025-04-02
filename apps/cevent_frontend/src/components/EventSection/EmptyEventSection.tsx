import { Box, Typography } from '@mui/material';
import Image from 'next/image';

const EmptyEventSection = () => {
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
        src="/images/notFoundImage.png"
        alt="Empty"
        width={150}
        height={150}
      />

      <Typography variant="bodyLarge" color="primary">
        No events found
      </Typography>
    </Box>
  );
};

export default EmptyEventSection;
