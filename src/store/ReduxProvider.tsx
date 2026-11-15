'use client';

import { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';
import {
  AUTH_STORAGE_KEY,
  setAccessToken,
  setAuth,
  setInitialized,
  setRefreshToken,
} from './features/authSlice';
import { AuthUserType } from '@/sharedTypes/sharedTypes';

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    const store = storeRef.current;
    if (!store) return;

    try {
      const access = localStorage.getItem('accessToken');
      const refresh = localStorage.getItem('refreshToken');
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as AuthUserType;
        if (parsed && typeof parsed.email === 'string') {
          store.dispatch(setAuth(parsed));
        }
      }
      if (access) {
        store.dispatch(setAccessToken(access));
      }
      if (refresh) {
        store.dispatch(setRefreshToken(refresh));
      }
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }

    store.dispatch(setInitialized());
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
