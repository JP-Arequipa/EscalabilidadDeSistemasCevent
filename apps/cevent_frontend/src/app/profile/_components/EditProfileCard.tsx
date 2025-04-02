import { UserInterface } from '@/utils/interfaces/UserInterfaces';
import { Alert, Box, Button, Paper, Snackbar, TextField } from '@mui/material';
import { useReducer, useState } from 'react';
import TextFieldEditable from './TextFieldEditable';
import { updateUser } from '@/services/UserService';
import LinearLoading from '@/components/Loaders/LinearLoading';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setUserInfo } from '@/redux/slices/userSlice';

interface EditProfileCardProps {
  user: UserInterface;
  setOpenEdit: (value: boolean) => void;
}

const EditProfileCard = ({ user, setOpenEdit }: EditProfileCardProps) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [nameIsValid, setNameIsValid] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [phoneNumberIsValid, setPhoneNumberIsValid] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState<'success' | 'error'>('success');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSave = async () => {
    setLoading(true);
    const userUpdated: UserInterface = {
      ...user,
      name,
      email,
      phoneNumber,
    };

    const response = await updateUser(userUpdated);
    if (response) {
      setSnackbarMessage('User updated successfully');
      setSeverity('success');
      dispatch(setUserInfo(userUpdated));
    } else {
      setSnackbarMessage('Error updating user');
      setSeverity('error');
    }
    setOpenEdit(false);
    setOpenSnackbar(true);
    setLoading(false);
  };

  return (
    <Box mt={4} display="flex" justifyContent="center" marginBottom={1}>
      <Paper
        elevation={4}
        sx={{
          padding: 2,
          width: '100%',
          maxWidth: 600,
          gap: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TextFieldEditable
          label="Name"
          value={name}
          setValue={setName}
          regexValidation={/^[a-zA-Z\s]*$/}
          errorMessage="Only letters and spaces are allowed"
          setIsValid={setNameIsValid}
        />
        <TextFieldEditable
          label="Email"
          value={email}
          setValue={setEmail}
          regexValidation={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/}
          errorMessage="Invalid email"
          setIsValid={setEmailIsValid}
        />
        <TextFieldEditable
          label="Phone number"
          value={phoneNumber}
          setValue={setPhoneNumber}
          regexValidation={/^\+\d+$/}
          errorMessage="Invalid phone number"
          setIsValid={setPhoneNumberIsValid}
        />
        {loading ? (
          <LinearLoading text="Saving..." />
        ) : (
          <Box
            display={'flex'}
            width={'100%'}
            flexDirection={'row'}
            justifyContent={'space-between'}
            gap={2}
          >
            <Button
              sx={{ flexGrow: 1 }}
              onClick={() => setOpenEdit(false)}
              variant="outlined"
              color="primary"
            >
              Cancel
            </Button>
            <Button
              sx={{ flexGrow: 1 }}
              onClick={handleSave}
              variant="contained"
              color="primary"
              disabled={!nameIsValid || !emailIsValid || !phoneNumberIsValid}
            >
              Save
            </Button>
          </Box>
        )}
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity={severity} onClose={() => setOpenSnackbar(false)}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EditProfileCard;
