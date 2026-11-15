'use client';

import { useParams } from 'next/navigation';
import styles from './page.module.css';
import { Suspense, useEffect, useState } from 'react';
import { getPlaylist } from '@/services/tracks/tracksapi';
import { PlaylistType } from '@/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';
import TracksSection from '@/components/TracksSection/TracksSection';

type PlaylistResult = {
  playlist: PlaylistType | null;
  error: string;
};

async function loadPlaylist(id: number): Promise<PlaylistResult> {
  return getPlaylist(id + 1)
    .then((playlist) => ({ playlist, error: '' }))
    .catch((err: unknown) => {
      if (err instanceof AxiosError) {
        if (err.response) {
          return { playlist: null, error: String(err.response.data) };
        }
        if (err.request) {
          return { playlist: null, error: 'Ошибка подключения к серверу' };
        }
        return { playlist: null, error: `Неизвестная ошибка: ${err.message}` };
      }
      return { playlist: null, error: 'Не удалось загрузить треки' };
    });
}

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const [playlist, setPlaylist] = useState<Promise<PlaylistResult> | null>(
    null,
  );

  useEffect(() => {
    if (params?.id) {
      setPlaylist(loadPlaylist(Number(params.id)));
    }
  }, [params?.id]);

  const handleReload = () => {
    if (params?.id) {
      setPlaylist(loadPlaylist(Number(params.id)));
    }
  };

  return (
    <Suspense fallback={<p className={styles.loading}>Загрузка музыки...</p>}>
      <TracksSection playlistPromise={playlist} onReload={handleReload} />
    </Suspense>
  );
}
