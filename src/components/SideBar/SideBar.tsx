'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './SideBar.module.css';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { AUTH_STORAGE_KEY, clearAuth } from '@/store/features/authSlice';

export default function Sidebar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuth } = useAppSelector((state) => state.auth);

  const handleAuthAction = () => {
    if (isAuth) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      dispatch(clearAuth());
    }
    router.push('/auth/signin');
  };

  return (
    <div className={styles.main__sidebar}>
      <div className={styles.sidebar__personal}>
        <p className={styles.sidebar__personalName}>
          {user?.username || user?.email || 'Гость'}
        </p>
        <div className={styles.sidebar__icon} onClick={handleAuthAction}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#logout"></use>
          </svg>
        </div>
      </div>
      <div className={styles.sidebar__block}>
        <div className={styles.sidebar__list}>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/1">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist01.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </Link>
          </div>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/2">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist02.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </Link>
          </div>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/3">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist03.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
