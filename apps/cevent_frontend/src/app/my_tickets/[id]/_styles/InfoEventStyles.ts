import { SxProps, Theme } from '@mui/material/styles';

const styles: { [key: string]: SxProps<Theme> } = {
  mainContainer: {
    marginTop: 2,
    display: 'flex',
    flexDirection: 'row',
    gap: 3,
    marginBottom: 2,
  },

  dataEventContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },

  dataRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 1,
  },
};

export default styles;
