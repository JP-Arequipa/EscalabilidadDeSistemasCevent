import { clearUserInfo, setUserInfo } from '@/redux/slices/userSlice';
import { getUserById, registerUser } from '@/services/UserService';
import { CustomSession } from '@/utils/interfaces/AuthSesion';
import { UserInterface } from '@/utils/interfaces/UserInterfaces';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

function useLoginUser() {
  const { data: session } = useSession();
  const customSession = session as CustomSession;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const hanldleLogIn = async () => {
    setLoading(true);
    const idUser = customSession.userId ?? null;
    if (idUser) {
      const user = await getUserById(idUser);
      if (user) {
        dispatch(setUserInfo(user));
      } else {
        const userToCreate: UserInterface = {
          id: idUser,
          name: session?.user?.name ?? '',
          //TODO: Implement logic to get the last name from the session
          lastName: session?.user?.name ?? '',
          email: session?.user?.email ?? '',
          phoneNumber: '+59100000000',
          photoUrl: 'null',
        };
        const response = await registerUser(userToCreate);
        if (response) {
          dispatch(setUserInfo(response));
        }
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      if (loading) return;
      hanldleLogIn();
    } else {
      dispatch(clearUserInfo());
    }
  }, [session]);

  return { session, customSession };
}

export default useLoginUser;
