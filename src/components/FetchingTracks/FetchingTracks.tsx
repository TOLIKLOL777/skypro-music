'use client';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect } from 'react';
import { getTracks } from '@/services/tracks/tracksapi';
import {
  setAllTracks,
  setFetchError,
  setFetchIsLoading,
} from '@/store/features/trackSlice';
import { AxiosError } from 'axios';

export default function FetchingTracks() {
  const dispatch = useAppDispatch();
  const { allTracks } = useAppSelector((state) => state.tracks);

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

  return null;
}
