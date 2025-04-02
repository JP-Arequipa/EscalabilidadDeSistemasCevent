import { getStatusString } from '@/utils/methods/eventStatusUtils';
import { Box, Typography } from '@mui/material';

interface StatusSectionHeaderProps {
  status: number;
}

export const StatusSectionHeader: React.FC<StatusSectionHeaderProps> = ({
  status,
}) => (
  <Box display="flex" alignItems="center" mb={2}>
    <Typography
      variant="h5"
      sx={{
        color: 'rgba(0, 0, 0, 0.6)',
        textAlign: 'left',
        mr: 2,
      }}
    >
      {getStatusString(status)} Activities
    </Typography>
    <Box
      sx={{
        flexGrow: 1,
        height: '2px',
        backgroundColor: '#ddd',
      }}
    />
  </Box>
);
