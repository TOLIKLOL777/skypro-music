import { addLike, removeLike } from '@/services/tracks/tracksapi';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { addLikedTracks, removeLikedTracks } from '@/store/features/trackSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { withReauth } from '@/utils/withReauth';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

type returnTypeHook = {
  isLoading: boolean;
  errorMsg: string | null;
  toggleLike: () => void;
  isLike: boolean;
};

export const useLikeTrack = (track: TrackType | null): returnTypeHook => {
  const { favoriteTracks } = useAppSelector((state) => state.tracks);
  const { accessToken, refreshToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const isLike = favoriteTracks.some((t) => t._id === track?._id);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const toggleLike = () => {
    if (!accessToken || !refreshToken) {
      toast.error('Войдите, чтобы добавлять треки в избранное');
      return setErrorMsg('Нет авторизации');
    }

    const actionApi = isLike ? removeLike : addLike;
    const actionSlice = isLike ? removeLikedTracks : addLikedTracks;

    setIsLoading(true);
    setErrorMsg(null);
    if (track) {
      withReauth(
        (newToken) => actionApi(newToken || accessToken, track._id),
        refreshToken,
        dispatch,
      )
        .then(() => {
          dispatch(actionSlice(track));
          toast.success(
            isLike ? 'Трек удален из избранного' : 'Трек добавлен в избранное',
          );
        })
        .catch((error) => {
          let message = 'Неизвестная ошибка';
          if (error instanceof AxiosError) {
            if (error.response?.data?.message) {
              message = error.response.data.message;
            } else if (typeof error.response?.data === 'string') {
              message = error.response.data;
            } else if (error.request) {
              message = 'Произошла ошибка. Попробуйте позже';
            }
          }
          setErrorMsg(message);
          toast.error(message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return {
    isLoading,
    errorMsg,
    toggleLike,
    isLike,
  };
};
