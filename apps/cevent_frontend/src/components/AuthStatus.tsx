'use client';

import { RootState } from '@/redux/store';
import { CustomSession } from '@/utils/interfaces/AuthSesion';
import { Button, Typography } from '@mui/material';
import { Session } from 'next-auth';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

async function keycloakSessionLogOut(): Promise<void> {
  try {
    await fetch('/api/auth/logout', { method: 'GET' });
  } catch (err) {
    console.error(err);
  }
}

export default function AuthStatus(): JSX.Element {
  const { data: session, status } = useSession();
  const customSession = session as CustomSession;
  const user = useSelector((state: RootState) => state.user.userInfo);

  useEffect(() => {
    if (
      status !== 'loading' &&
      customSession &&
      customSession?.error === 'RefreshAccessTokenError'
    ) {
      signOut({ callbackUrl: '/' });
    } else {
      console.log('id_ token', customSession?.id_token);
      console.log('access_token', customSession?.access_token);
    }
  }, [customSession, status]);

  if (status === 'loading') {
    return <Typography variant="h6">Loding ...</Typography>;
  } else if (customSession) {
    return (
      <div>
        <Typography variant="h6">Welcome, {user?.name}.</Typography>
        <Typography variant="body1">Your ID: {user?.id}</Typography>
        <Typography variant="body1">
          Your id token: {customSession.id_token}
        </Typography>
        <Typography variant="body1">
          Your id token: {customSession.access_token}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            keycloakSessionLogOut().then(() => {
              signOut({ callbackUrl: '/' });
            });
          }}
          sx={{ width: '200px' }}
        >
          Log Out
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h6">Please log in.</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => signIn('keycloak')}
        sx={{ width: '200px' }}
      >
        Login
      </Button>
    </div>
  );
}
