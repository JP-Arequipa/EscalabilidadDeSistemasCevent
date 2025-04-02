import { Box } from '@mui/material';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}
/**
 * Layout component, the main layout for the app
 *
 * @param children page content
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        maxWidth: '1040px',
        margin: '0 auto',
        padding: { xs: '8px', sm: '12px', md: '16px' },
        boxSizing: 'border-box',
      }}
    >
      {children}
    </Box>
  );
};

export default Layout;
