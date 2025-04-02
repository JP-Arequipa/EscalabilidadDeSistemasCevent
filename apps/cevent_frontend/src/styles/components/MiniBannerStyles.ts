import { SxProps, Theme } from '@mui/material/styles';

const styles: { [key: string]: SxProps<Theme> } = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '5px',
    marginTop: '20px',
    width: '100%',
  },
  imageContainer: {
    position: 'relative',
    width: '55%',
    paddingBottom: '30%',
  },

  dataEventContainer: {
    position: 'relative',
    width: '45%',
    paddingBottom: '30%',
    backgroundImage: 'url(images/backBlue.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.25)',
    },
  },

  textTitle: {
    color: 'white',
  },

  dateChip: {
    backgroundColor: '#f2f2f2',
    color: 'lightBlack.main',
  },

  chipContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
  },

  dataContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 2,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    gap: 2,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },

  textDescription: {
    color: '#fff',
    textAlign: 'center',
  },

  buttonMoreInfo: {
    backgroundColor: 'accent.main',
    color: 'white',
    padding: 1,
    borderRadius: 1,
  },

  textMoreInfo: {
    textAlign: 'center',
    color: 'white',
  },
};

export default styles;
