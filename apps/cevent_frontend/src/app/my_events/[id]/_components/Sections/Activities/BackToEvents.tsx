import Link from 'next/link';
import { Button } from '@mui/material';
import { ChevronLeft } from 'lucide-react';

const BackToMyEvents = () => {
  return (
    <Link href="/my_events" passHref>
      <Button
        sx={{
          backgroundColor: 'transparent',
          border: 'none',
          color: 'inherit',
          padding: '0.5rem 1rem',
          display: 'flex',
          alignItems: 'center',
          textTransform: 'none',
          fontSize: '1.2rem',
          borderRadius: '30%',
          transition: 'background-color 0.3s ease',
          '&:hover': {
            backgroundColor: 'rgba(240, 240, 240, 0.5)',
          },
        }}
      >
        <ChevronLeft size={16} />
        <span style={{ marginLeft: '8px' }}>Back to My Events</span>
      </Button>
    </Link>
  );
};

export default BackToMyEvents;
