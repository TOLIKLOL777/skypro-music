'use client';

import styles from './page.module.css';
import Bar from '@/components/Bar/Bar';
import Navigation from '@/components/Navigation/Navigation';
import { CenterBlock } from '@/components/CenterBlock/CenterBlock';
import Sidebar from '@/components/SideBar/SideBar';
import { useEffect, useState } from 'react';
import { getTracks } from '@/services/tracks/tracksapi';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';

export default function Home() {
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [error, setError] = useState('');

  const handleReload = () => {
    window.location.reload();
  };

  useEffect(() => {
    getTracks()
      .then((res) => {
        setTracks(res);
        console.log(res[0].album);
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            setError(error.response.data);
          } else if (error.request) {
            setError(`Ошибка подключения: ${error.request}`);
          } else {
            setError(`Неизвестная ошибка: ${error.message}`);
          }
        }
      });
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          {error && (
            <div className={styles.error_messange}>
              <p className={styles.error_text}>{error}</p>
              <button className={styles.error_button} onClick={handleReload}>
                Перезагрузить страницу
              </button>
            </div>
          )}
          <Navigation />
          <CenterBlock tracks={tracks} />
          <Sidebar />
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
