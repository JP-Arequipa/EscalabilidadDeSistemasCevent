import { SxProps, Theme } from '@mui/material/styles';

const styles: { [key: string]: SxProps<Theme> } = {
  container: {
    padding: '20px',
    width: '100%',
  },

  title: {
    marginBottom: 4,
    fontWeight: 'bold',
    fontSize: '2rem',
  },

  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    height: '100%',
  },

  tabs: {
    display: 'flex',
    borderBottom: 1,
    borderColor: 'divider',
    marginBottom: 3,
  },

  activeTab: {
    fontWeight: 'bold',
    color: 'black',
    borderBottom: '3px solid black',
  },

  inactiveTab: {
    fontWeight: 'bold',
    color: 'grey',
  },

  sectionTitle: {
    fontWeight: 'bold',
    fontSize: '1.25rem',
    marginBottom: 2,
  },

  inputField: {
    marginBottom: 2,
    '& .MuiOutlinedInput-root': {
      borderRadius: 4,
    },
  },

  payNowButton: {
    marginTop: '20px',
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    fontSize: '16px',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
  },

  orderSummary: {
    padding: '20px',
    height: 'fit-content',
    color: 'black',
  },

  orderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 1,
  },

  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    marginTop: 2,
  },
};

export default styles;
