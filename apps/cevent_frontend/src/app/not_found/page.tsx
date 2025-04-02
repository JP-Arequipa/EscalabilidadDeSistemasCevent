import { Box, Typography } from '@mui/material';

const NotFound = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      flexDirection="column"
    >
      <Typography variant="h1" color="primary">
        404
      </Typography>
      <Typography variant="h6">Page not found</Typography>
    </Box>
  );
};

export default NotFound;
