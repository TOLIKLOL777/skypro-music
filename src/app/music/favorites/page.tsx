'use client';

import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';
import Navigation from '@/components/Navigation/Navigation';
import Sidebar from '@/components/SideBar/SideBar';
import Bar from '@/components/Bar/Bar';
import styles from '../main/page.module.css';

export default function FavoritesPage() {
  return (
    <PrivateRoute>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <main className={styles.main}>
            <Navigation />
            <div style={{ flexGrow: 1, padding: '20px 40px' }}>
              <h2 style={{ color: '#ffffff', fontSize: '64px' }}>Мои треки</h2>
            </div>
            <Sidebar />
          </main>
          <Bar />
          <footer className="footer"></footer>
        </div>
      </div>
    </PrivateRoute>
  );
}
