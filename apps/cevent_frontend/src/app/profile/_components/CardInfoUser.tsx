import { UserInterface } from '@/utils/interfaces/UserInterfaces';
import { Box, IconButton, Paper, Typography } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';

interface CardInfoUserProps {
  user: UserInterface;
  setOpenEdit: (value: boolean) => void;
}

const CardInfoUser = ({ user, setOpenEdit }: CardInfoUserProps) => {
  return (
    <Box mt={4} display="flex" justifyContent="center">
      <Paper elevation={3} sx={{ padding: 2, width: '100%', maxWidth: 600 }}>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          flexDirection={'row'}
        >
          <Typography variant="h6" gutterBottom>
            Personal Information
          </Typography>
          <IconButton onClick={() => setOpenEdit(true)}>
            <CreateIcon color="primary" />
          </IconButton>
        </Box>
        <Typography variant="body1">Name: {user?.name}</Typography>
        <Typography variant="body1">Email: {user?.email}</Typography>
        <Typography variant="body1">
          Phone number: {user?.phoneNumber}
        </Typography>
      </Paper>
    </Box>
  );
};

export default CardInfoUser;
