import { SxProps, Theme } from '@mui/material/styles';

export const styleModal: { [key: string]: SxProps<Theme> } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#fcf8f8',
    width: 'fit-content',
    height: 'fit-content',
    padding: '2rem',
    borderRadius: '5px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },

  boxDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
    alignItems: 'center',
  },

  line: {
    backgroundColor: 'black',
    height: 1.5,
    width: '100%',
  },

  boxRow: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    gap: 3,
  },

  boxColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },

  containerCheckout: {
    overflowY: 'auto',
    overflowX: 'hidden',
    maxHeight: '450px',
    paddingRight: 1,
    minWidth: '400px',
  },
};
