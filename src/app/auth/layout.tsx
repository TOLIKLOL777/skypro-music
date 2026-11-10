import { ReactNode } from 'react';
import styles from './layout.module.css';

interface AuthLayoutPage {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutPage) {
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
