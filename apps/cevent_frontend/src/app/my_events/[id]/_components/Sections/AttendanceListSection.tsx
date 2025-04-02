import Layout from '@/components/Layout';
import { Box, Typography } from '@mui/material';

const AttendanceListSection = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Layout>
        <Typography color="primary" variant="display">
          Attendance{' '}
        </Typography>
        <Typography variant="display">Section</Typography>
      </Layout>
    </Box>
  );
};

export default AttendanceListSection;
