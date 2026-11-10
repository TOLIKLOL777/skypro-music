'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './Navigation.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { AUTH_STORAGE_KEY, clearAuth } from '@/store/features/authSlice';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  const handleLogout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    dispatch(clearAuth());
    router.push('/auth/signin');
  };

  return (
    <nav className={styles.main__nav}>
      <div className={styles.nav__logo}>
        <Image
          width={250}
          height={170}
          className={styles.logo__image}
          src="/img/logo.png"
          alt="logo"
        />
      </div>
      <div
        className={styles.nav__burger}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
      </div>
      {menuOpen && (
        <div className={styles.nav__menu}>
          <ul className={styles.menu__list}>
            <li className={styles.menu__item}>
              <Link href="/music/main" className={styles.menu__link}>
                Главное
              </Link>
            </li>
            <li className={styles.menu__item}>
              <Link href="/music/favorites" className={styles.menu__link}>
                Мой плейлист
              </Link>
            </li>
            <li className={styles.menu__item}>
              {isAuth ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className={styles.menu__link}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  Выйти
                </button>
              ) : (
                <Link href="/auth/signin" className={styles.menu__link}>
                  Войти
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
