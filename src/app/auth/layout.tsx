'use client';

import { ReactNode, useEffect } from 'react';
import styles from './layout.module.css';
import { Login } from '@/services/auth/authapi';

interface AuthLayoutPage {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutPage) {
  const data = {
    login: 'admin',
    password: 'admin',
  };
  useEffect(() => {
    Login(data);
  }, []);
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.containerEnter}>
          <div className={styles.modal__block}>
            <form className={styles.modal__form}>{children}</form>
          </div>
        </div>
      </div>
    </>
  );
}
