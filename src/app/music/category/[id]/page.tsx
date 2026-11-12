'use client';

import { useParams } from 'next/navigation';
import styles from './page.module.css';
import Bar from '@/components/Bar/Bar';
import Navigation from '@/components/Navigation/Navigation';
import Sidebar from '@/components/SideBar/SideBar';
import { Suspense, useEffect, useState } from 'react';
import { getPlaylist, getTracks } from '@/services/tracks/tracksapi';
import { PlaylistType, TrackType } from '@/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';
import TracksSection from '@/components/TracksSection/TracksSection';

type TracksResult = {
  tracks: TrackType[];
  error: string;
};

type PlaylistResult = {
  playlist: PlaylistType | null;
  error: string;
};

async function loadTracks(): Promise<TracksResult> {
  return getTracks()
    .then((tracks) => ({ tracks, error: '' }))
    .catch((err: unknown) => {
      if (err instanceof AxiosError) {
        if (err.response) {
          return { tracks: [], error: String(err.response.data) };
        }
        if (err.request) {
          return { tracks: [], error: 'Ошибка подключения к серверу' };
        }
        return { tracks: [], error: `Неизвестная ошибка: ${err.message}` };
      }
      return { tracks: [], error: 'Не удалось загрузить треки' };
    });
}

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
  const [tracks, setTracks] = useState<Promise<TracksResult> | null>(null);
  const [playlist, setPlaylist] = useState<Promise<PlaylistResult> | null>(
    null,
  );

  useEffect(() => {
    if (params?.id) {
      setTracks(loadTracks());
      setPlaylist(loadPlaylist(Number(params.id)));
    }
  }, [params?.id]);

  const handleReload = () => {
    if (params?.id) {
      setTracks(loadTracks());
      setPlaylist(loadPlaylist(Number(params.id)));
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Navigation />
          <Suspense
            fallback={<p className={styles.loading}>Загрузка музыки...</p>}
          >
            <TracksSection
              tracksPromise={tracks}
              playlistPromise={playlist}
              onReload={handleReload}
            />
          </Suspense>
          <Sidebar />
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
