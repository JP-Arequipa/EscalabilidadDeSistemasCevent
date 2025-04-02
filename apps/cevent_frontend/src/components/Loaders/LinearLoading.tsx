import { Box, LinearProgress, Typography } from '@mui/material';

interface LinearLoadingProps {
  text?: string;
}

const LinearLoading = ({ text }: LinearLoadingProps) => {
  return (
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
          {text ? text : 'Loading...'}
        </Typography>
        <Box sx={{ width: '100%', mt: 2 }}>
          <LinearProgress />
        </Box>
      </Box>
    </Box>
  );
};

export default LinearLoading;
