import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import styles from '@/styles/components/Footer.module.css';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      className={styles.footer}
      sx={{ position: 'relative', zIndex: 10 }}
    >
      <Box className={styles.footerSection}>
        <Typography variant="h5" className={styles.footerTitle}>
          Cvent
        </Typography>
        <Typography variant="body2" className={styles.footerText}>
          Discover and organize events with ease through our events app,
          designed to connect people with unique experiences in your city and
          beyond. Our platform allows users to explore a wide variety of events,
          from concerts and exhibitions to conferences and outdoor activities.
        </Typography>
      </Box>

      <Box className={styles.footerSection}>
        <Typography variant="h5" className={styles.footerTitle}>
          Contacto
        </Typography>
        <Typography variant="body2" className={styles.footerText}>
          <Link
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
            underline="none"
          >
            Facebook
          </Link>
        </Typography>
        <Typography variant="body2" className={styles.footerText}>
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
            underline="none"
          >
            Instagram
          </Link>
        </Typography>
        <Typography variant="body2" className={styles.footerText}>
          <Link
            href="mailto:your-email@example.com"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
            underline="none"
          >
            Email
          </Link>
        </Typography>
      </Box>

      <Box className={styles.footerSection}>
        <Typography variant="h5" className={styles.footerTitle}>
          Information
        </Typography>
        <Typography variant="body2" className={styles.footerText}>
          <Link href="/terms" color="inherit" underline="none">
            Terms of use
          </Link>
        </Typography>
        <Typography variant="body2" className={styles.footerText}>
          <Link href="/privacy" color="inherit" underline="none">
            Privacy Policy
          </Link>
        </Typography>
        <Typography variant="body2" className={styles.footerText}>
          <Link href="/about" color="inherit" underline="none">
            About us
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
