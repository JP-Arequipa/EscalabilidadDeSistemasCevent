import { SxProps, Theme } from '@mui/material/styles';

export const stylesBanner: { [key: string]: SxProps<Theme> } = {
  bannerEvent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '2rem',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    gap: 0.8,
    borderRadius: 2,
    position: 'relative',
    overflow: 'hidden',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '50%',
      background:
        'linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))',
    },
  },

  textBanner: {
    color: 'white',
  },

  buttonBanner: {
    marginTop: 1,
    width: 'fit-content',
    borderRadius: 3.5,
  },

  containerInfo: {
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
};
