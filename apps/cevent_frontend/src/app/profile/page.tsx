'use client';

import Layout from '@/components/Layout';
import { useRoles } from '@/hooks/use-roles';
import { RootState } from '@/redux/store';
import { UserInterface } from '@/utils/interfaces/UserInterfaces';
import { Box, Typography, Avatar } from '@mui/material';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import CardInfoUser from './_components/CardInfoUser';
import EditEventCard from './_components/EditProfileCard';
import UploadImageButton from '@/components/UploadImageButton';
import { UploadWidgetResult } from '@/utils/interfaces/UploadImage';
import { setUserInfo } from '@/redux/slices/userSlice';
import { updateUser } from '@/services/UserService';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LinearLoading from '@/components/Loaders/LinearLoading';

export default function ProfilePage() {
  const { hasRole } = useRoles();
  const user = useSelector((state: RootState) => state.user.userInfo);
  const [openEdit, setOpenEdit] = useState(false);
  const dispatch = useDispatch();
  const { status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/not_found');
    }
  }, [status]);

  const onCompleteUploadImage = (fileUrl: string) => {
    if (user) {
      const userUpdated: UserInterface = {
        ...user,
        photoUrl: fileUrl,
      };
      setLoading(true);
      updateUser(userUpdated)
        .then((response) => {
          if (response) {
            dispatch(setUserInfo(userUpdated));
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  if (status === 'loading') {
    return (
      <Layout>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          minHeight={'75vh'}
        >
          <LinearLoading text="Loading profile" />
        </Box>
      </Layout>
    );
  }

  return (
    <Box sx={{ minHeight: '70vh' }}>
      <Layout>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          height={'100%'}
        >
          <Avatar
            alt={user?.name}
            src={user?.photoUrl}
            sx={{ width: 100, height: 100 }}
          />
          <Typography variant="h4" mt={2}>
            {user?.name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {user?.email}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {user?.phoneNumber}
          </Typography>
          {hasRole('admin') && (
            <Typography variant="body2" color="secondary" mt={1}>
              Admin Account
            </Typography>
          )}
          {loading ? (
            <LinearLoading text="Saving..." />
          ) : (
            <UploadImageButton
              onComplete={onCompleteUploadImage}
              variant="outlined"
              textButton="Change Profile Picture"
            />
          )}
        </Box>
        {openEdit && user ? (
          <EditEventCard user={user} setOpenEdit={setOpenEdit} />
        ) : (
          <CardInfoUser
            user={user as UserInterface}
            setOpenEdit={setOpenEdit}
          />
        )}
      </Layout>
    </Box>
  );
}
