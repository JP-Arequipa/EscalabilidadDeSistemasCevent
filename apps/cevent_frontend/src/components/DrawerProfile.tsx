import { useRoles } from '@/hooks/use-roles';
import { RootState } from '@/redux/store';
import { keycloakSessionLogOut } from '@/services/AuthService';
import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  IconButton,
} from '@mui/material';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useState } from 'react';

interface DrawerProfileProps {
  setAnchorEl: (value: null | HTMLElement) => void;
  anchorEl: null | HTMLElement;
}

const DrawerProfile = ({ setAnchorEl, anchorEl }: DrawerProfileProps) => {
  const user = useSelector((state: RootState) => state.user.userInfo);
  const router = useRouter();
  const { hasRole } = useRoles();

  const handleClickProfile = () => {
    setAnchorEl(null);
    router.push('/profile');
  };

  const handleLogout = () => {
    keycloakSessionLogOut().then(() => {
      signOut({ callbackUrl: '/' });
    });
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          padding: 3,
          gap: 2,
        }}
      >
        <Box display="flex" flexDirection="row" gap={2}>
          <Avatar
            sx={{ width: 60, height: 60 }}
            alt={user?.name}
            src={user?.photoUrl}
          />
          <Box display="flex" flexDirection="column" maxWidth={200}>
            <Typography fontWeight={'bold'} textAlign={'left'} variant="body">
              {user?.name}
            </Typography>
            <Typography textAlign={'left'} variant="body">
              {user?.email}
            </Typography>
          </Box>
        </Box>
        <Box
          width={'100%'}
          display="flex"
          justifyContent="flex-start"
          flexDirection="column"
        >
          <MenuItem onClick={handleClickProfile}>
            <PersonOutlineIcon sx={{ marginRight: 1 }} color="primary" />
            <Typography fontWeight={300} variant="body">
              Profile
            </Typography>
          </MenuItem>
          {hasRole('admin') && (
            <MenuItem onClick={() => router.push('/admin')}>
              <Typography variant="body">Admin page</Typography>
            </MenuItem>
          )}
          <MenuItem onClick={handleLogout}>
            <LogoutIcon sx={{ marginRight: 1, color: '#dd5b5b' }} />
            <Typography variant="body">Log Out</Typography>
          </MenuItem>
        </Box>
      </Box>
    </Menu>
  );
};

export default DrawerProfile;
