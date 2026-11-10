'use client';

import styles from './page.module.css';
import Bar from '@/components/Bar/Bar';
import Navigation from '@/components/Navigation/Navigation';
import Sidebar from '@/components/SideBar/SideBar';
import { Suspense, useEffect, useState } from 'react';
import { getTracks } from '@/services/tracks/tracksapi';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';
import TracksSection from '@/components/TracksSection/TracksSection';

type TracksResult = {
  tracks: TrackType[];
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

export default function Home() {
  const [tracks, setTracks] = useState<Promise<TracksResult> | null>(null);

  useEffect(() => {
    setTracks(loadTracks());
  }, []);

  const handleReload = () => {
    setTracks(loadTracks());
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Navigation />
          <Suspense
            fallback={<p className={styles.loading}>Загрузка музыки...</p>}
          >
            <TracksSection tracksPromise={tracks} onReload={handleReload} />
          </Suspense>
          <Sidebar />
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
