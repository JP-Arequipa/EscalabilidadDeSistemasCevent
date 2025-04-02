import { SxProps, Theme } from '@mui/material/styles';

const styles: { [key: string]: SxProps<Theme> } = {
  cardStyles: {
    height: '100%',
    position: 'relative',
  },
  chipAttendeeCountStyles: {
    position: 'absolute',
    top: 107,
    left: 8,
    backgroundColor: '#fff',
    color: '#035ae1',
    height: '24px',
  },
  chipPriceStyles: {
    position: 'absolute',
    top: 107,
    right: 8,
    height: '24px',
  },
  cardContentStyles: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    paddingLeft: '8px',
    paddingRight: '8px',
  },
  chipCategoryStyles: {
    height: '22px',
    fontSize: '12px',
  },
  chipEventDateStyles: {
    height: '22px',
    color: 'lightBlack.main',
    fontSize: '12px',
    backgroundColor: '#f2f2f2',
  },
  chipLocationStyles: {
    height: '22px',
    color: 'lightBlack.main',
    fontSize: '12px',
    backgroundColor: '#f2f2f2',
  },
};

export default styles;
