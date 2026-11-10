'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/store';

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuth, isInitialized } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isInitialized && !isAuth) {
      router.replace('/auth/signin');
    }
  }, [isInitialized, isAuth, router]);

  if (!isInitialized || !isAuth) {
    return null;
  }

  return <>{children}</>;
}
