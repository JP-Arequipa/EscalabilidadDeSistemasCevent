import { SxProps, Theme } from '@mui/material/styles';

export const stylesStatus: { [key: string]: SxProps<Theme> } = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    borderColor: 'primary.main',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 2,
    padding: 2,
  },
};
