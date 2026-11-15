'use client';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect } from 'react';
import { getFavorite, getTracks } from '@/services/tracks/tracksapi';
import {
  setAllTracks,
  setFavoriteTracks,
  setFetchError,
  setFetchIsLoading,
} from '@/store/features/trackSlice';
import { AxiosError } from 'axios';
import { withReauth } from '@/utils/withReauth';

export default function FetchingTracks() {
  const dispatch = useAppDispatch();
  const { allTracks } = useAppSelector((state) => state.tracks);
  const { accessToken, refreshToken, isAuth } = useAppSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (allTracks.length) {
      dispatch(setAllTracks(allTracks));
    } else {
      dispatch(setFetchIsLoading(true));
      getTracks()
        .then((res) => {
          dispatch(setAllTracks(res));
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            if (error.response) {
              dispatch(
                setFetchError(
                  typeof error.response.data === 'string'
                    ? error.response.data
                    : (error.response.data as { message?: string })?.message ||
                        'Произошла ошибка при загрузке треков',
                ),
              );
            } else if (error.request) {
              dispatch(setFetchError('Произошла ошибка. Попробуйте позже'));
            } else {
              dispatch(setFetchError('Неизвестная ошибка'));
            }
          } else {
            dispatch(setFetchError('Неизвестная ошибка'));
          }
        })
        .finally(() => {
          dispatch(setFetchIsLoading(false));
        });
    }
  }, []);

  useEffect(() => {
    if (isAuth && accessToken && refreshToken) {
      withReauth(
        (token) => getFavorite(token || accessToken),
        refreshToken,
        dispatch,
      )
        .then((res) => {
          dispatch(setFavoriteTracks(res));
        })
        .catch((error) => {
          console.error('Ошибка загрузки избранных треков:', error);
        });
    } else if (!isAuth) {
      dispatch(setFavoriteTracks([]));
    }
  }, [isAuth, accessToken, refreshToken, dispatch]);

  return null;
}
