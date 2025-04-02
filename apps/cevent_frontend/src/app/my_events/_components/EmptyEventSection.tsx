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
        src="https://i.postimg.cc/XJssnvgV/7117865-3371469-1.png"
        alt="Empty"
        width={150}
        height={150}
      />
      <Typography variant="bodyLarge" color="primary">
        No events created by you found
      </Typography>
    </Box>
  );
};

export default EmptyEventSection;
