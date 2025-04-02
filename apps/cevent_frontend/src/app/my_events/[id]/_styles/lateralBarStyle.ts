import { SxProps, Theme } from '@mui/material/styles';

export const stylesBar: { [key: string]: SxProps<Theme> } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    gap: '2rem',
    minHeight: '80vh',
    width: 'auto',
    alignItems: 'center',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    paddingTop: '10rem',
  },

  icon: {
    fontSize: '2rem',
  },
};
