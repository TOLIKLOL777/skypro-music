'use client';

import { PlaylistType, TrackType } from '@/sharedTypes/sharedTypes';
import styles from './TracksSection.module.css';
import { CenterBlock } from '@/components/CenterBlock/CenterBlock';
import { use } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { getTracks } from '@/services/tracks/tracksapi';
import {
  setAllTracks,
  setFetchError,
  setFetchIsLoading,
} from '@/store/features/trackSlice';
import { AxiosError } from 'axios';

type TracksResult = {
  tracks: TrackType[];
  error: string;
};

type PlaylistResult = {
  playlist: PlaylistType | null;
  error: string;
};

export default function TracksSection({
  tracksPromise,
  playlistPromise = null,
  onReload,
}: {
  tracksPromise?: Promise<TracksResult> | null;
  playlistPromise?: Promise<PlaylistResult> | null;
  onReload?: () => void;
}) {
  const dispatch = useAppDispatch();
  const { allTracks, fetchError, fetchIsLoading } = useAppSelector(
    (state) => state.tracks,
  );

  const tracksFromPromise = tracksPromise ? use(tracksPromise) : null;
  const playlistData = playlistPromise ? use(playlistPromise) : null;

  const tracks = tracksFromPromise ? tracksFromPromise.tracks : allTracks;
  const tracksError = tracksFromPromise ? tracksFromPromise.error : fetchError;

  const error = tracksError || playlistData?.error;

  const handleReload = () => {
    if (onReload) {
      onReload();
    }
    if (fetchError) {
      dispatch(setFetchIsLoading(true));
      dispatch(setFetchError(null));
      getTracks()
        .then((res) => {
          dispatch(setAllTracks(res));
        })
        .catch((err) => {
          if (err instanceof AxiosError) {
            if (err.response) {
              dispatch(
                setFetchError(
                  typeof err.response.data === 'string'
                    ? err.response.data
                    : (err.response.data as { message?: string })?.message ||
                        'Ошибка сервера',
                ),
              );
            } else if (err.request) {
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
  };

  if (!tracksPromise && fetchIsLoading && !tracks.length && !error) {
    return <p className={styles.loading}>Загрузка музыки...</p>;
  }

  if (error) {
    return (
      <div className={styles.center_error_wrapper}>
        <div className={styles.error_message}>
          <p className={styles.error_text}>{error || fetchError}</p>
          <button className={styles.error_button} onClick={handleReload}>
            Перезагрузить страницу
          </button>
        </div>
      </div>
    );
  }

  const playlist = playlistData?.playlist;
  const trackMap = new Map(tracks.map((track) => [track._id, track]));
  const displayedTracks = playlist?.items
    ? playlist.items
        .map((id) => trackMap.get(id))
        .filter((track): track is TrackType => Boolean(track))
    : tracks;

  return (
    <CenterBlock tracks={displayedTracks} title={playlist?.name || 'Треки'} />
  );
}
