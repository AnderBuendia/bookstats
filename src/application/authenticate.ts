import { useMemo } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

export const useAuthenticate = () => {
  const { data: session } = useSession();

  return useMemo(
    () =>
      ({
        session,
        signIn,
        signOut,
      } as const),
    [session]
  );
};
