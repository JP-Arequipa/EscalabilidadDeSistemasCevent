import { SxProps, Theme } from '@mui/material/styles';

export const styles: { [key: string]: SxProps<Theme> } = {
  mainContainer: {
    position: 'relative',
  },

  containerImage: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },
};

export const styleEventOrganizer: { [key: string]: SxProps<Theme> } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    gap: 1,
    maxWidth: 200,
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
  },
  infoUser: {
    display: 'flex',
    flexDirection: 'row',
    gap: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  containerName: {
    display: 'flex',
    flexDirection: 'column',
  },

  grayText: {
    color: 'lightBlack.main',
    fontSize: '14px',
  },
};

export const styleEventDetail: { [key: string]: SxProps<Theme> } = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 3,
    alignItems: 'left',
    marginBottom: 2,
    marginTop: 2,
  },
};
