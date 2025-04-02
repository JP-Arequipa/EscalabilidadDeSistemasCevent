import { SxProps, Theme } from '@mui/material/styles';

const styles: { [key: string]: SxProps<Theme> } = {
  modalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 4,
  },

  modalTitle: {
    marginBottom: 2,
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },

  textField: {
    marginBottom: 2,
    '& .MuiOutlinedInput-root': {
      borderRadius: 4,
      '& input': {
        color: '#000',
      },
    },
  },

  ticketsInfoContainer: {
    marginTop: 2,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  divider: {
    marginY: 2,
    borderColor: 'rgba(0, 0, 0, 0.12)',
  },

  totalContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
    fontWeight: 'bold',
    fontSize: '1.1rem',
  },

  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 2,
    marginTop: 3,
  },

  cancelButton: {
    textTransform: 'none',
    color: 'primary.main',
    borderColor: 'primary.main',
    borderRadius: 4,
    width: 180,
  },

  checkoutButton: {
    textTransform: 'none',
    borderRadius: 4,
    width: 180,
  },
};

export default styles;
