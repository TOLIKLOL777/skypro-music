'use client';

import { CenterBlock } from '@/components/CenterBlock/CenterBlock';
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect, useState } from 'react';
import { getFavorite } from '@/services/tracks/tracksapi';
import { setFavoriteTracks } from '@/store/features/trackSlice';
import { withReauth } from '@/utils/withReauth';
import styles from '@/components/TracksSection/TracksSection.module.css';

export default function FavoritesPage() {
  const dispatch = useAppDispatch();
  const { favoriteTracks } = useAppSelector((state) => state.tracks);
  const { accessToken, refreshToken, isAuth } = useAppSelector(
    (state) => state.auth,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadFavorites = () => {
    if (accessToken && refreshToken) {
      setIsLoading(true);
      setError(null);
      withReauth(
        (token) => getFavorite(token || accessToken),
        refreshToken,
        dispatch,
      )
        .then((res) => {
          dispatch(setFavoriteTracks(res));
        })
        .catch(() => {
          setError('Не удалось загрузить плейлист');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    if (isAuth && accessToken && refreshToken && favoriteTracks.length === 0) {
      loadFavorites();
    }
  }, [isAuth, accessToken, refreshToken]);

  return (
    <PrivateRoute>
      {error ? (
        <div className={styles.center_error_wrapper}>
          <div className={styles.error_message}>
            <p className={styles.error_text}>{error}</p>
            <button className={styles.error_button} onClick={loadFavorites}>
              Перезагрузить страницу
            </button>
          </div>
        </div>
      ) : isLoading && favoriteTracks.length === 0 ? (
        <p className={styles.loading}>Загрузка музыки...</p>
      ) : (
        <CenterBlock tracks={favoriteTracks} title="Мой плейлист" />
      )}
    </PrivateRoute>
  );
}
