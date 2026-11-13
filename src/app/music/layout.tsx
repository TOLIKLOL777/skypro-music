import { ReactNode } from 'react';
import styles from './layout.module.css';

import Navigation from '@/components/Navigation/Navigation';
import Sidebar from '@/components/SideBar/SideBar';
import Bar from '@/components/Bar/Bar';
import FetchingTracks from '@/components/FetchingTracks/FetchingTracks';

export default function MusicLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <FetchingTracks />
          <Navigation />
          {children}
          <Sidebar />
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
