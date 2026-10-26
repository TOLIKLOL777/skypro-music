import './page.css';
import styles from './page.module.css';
import Bar from '@/components/bar/Bar';
import Navigation from '@/components/Navigation/Navigation';
import { CenterBlock } from '@/components/CenterBlock/CenterBlock';
import Sidebar from '@/components/SideBar/SideBar';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Navigation />
          <CenterBlock />
          <Sidebar />
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
