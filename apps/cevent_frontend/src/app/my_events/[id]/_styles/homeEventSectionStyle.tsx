import { SxProps, Theme } from '@mui/material/styles';

export const stylesPage: Record<string, SxProps<Theme>> = {
  container: {
    padding: 1,
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  cardStyles: {
    padding: 3,
    borderRadius: 4,
    boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  },
  titleStyles: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: '1.5rem',
  },
  chipCategoryStyles: {
    padding: '4px 8px',
    backgroundColor: '#035AE1',
    color: '#ffffff',
    borderRadius: '16px',
    fontSize: '0.85rem',
  },
  ongoingStatusChip: {
    padding: '4px 8px',
    backgroundColor: '#F6B835',
    color: '#fff',
    borderRadius: '16px',
    fontSize: '0.85rem',
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
  iconStyles: {
    width: 'fit-content',
    color: '#035AE1',
  },
  labelStyles: {
    fontWeight: 'bold',
    marginRight: 1,
    color: '#8c8c8c',
  },
  linkStyles: {
    color: '#1976d2',
    textDecoration: 'none',
    fontWeight: 'bold',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  ticketCard: {
    padding: 2,
    textAlign: 'center',
    borderRadius: 4,
    boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    '&:nth-of-type(1)': {
      backgroundColor: '#ffffff',
    },
    '&:nth-of-type(2)': {
      backgroundColor: '#ffffff',
    },
    '& > p:first-of-type': {
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '#333',
    },
    '& > p:last-of-type': {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      marginTop: 1,
    },
  },
  validateCard: {
    width: '308',
    padding: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 4,
    boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    height: '368',
  },
  ticketButtonStyles: {
    marginTop: 2,
    padding: '8px 16px',
    fontSize: '1rem',
    fontWeight: 'bold',
    borderRadius: 4,
  },

  inProgressStatusChip: {
    backgroundColor: '#F6B835',
    color: '#fff',
    fontWeight: 'bold',
    borderRadius: '16px',
    fontSize: '0.85rem',
  },

  finishedStatusChip: {
    backgroundColor: '#F6B835',
    color: '#fff',
    fontWeight: 'bold',
    borderRadius: '16px',
    fontSize: '0.85rem',
  },
};
