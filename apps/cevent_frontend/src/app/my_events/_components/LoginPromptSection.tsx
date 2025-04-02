import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const LoginPromptSection = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/profile');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        height: '200px',
      }}
    >
      <Image
        src="https://i.postimg.cc/wBn26k8M/7129039-3849519-1.png"
        alt="Login Required"
        width={150}
        height={150}
      />
      <Typography variant="h6" color="primary">
        You need to log in to access this section.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        sx={{ borderRadius: '10px' }}
      >
        Log in
      </Button>
    </Box>
  );
};

export default LoginPromptSection;
