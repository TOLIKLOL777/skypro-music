'use client';

import { getTokens, Login } from '@/services/auth/authapi';
import styles from './signin.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/store';
import {
  AUTH_STORAGE_KEY,
  extractAuthUser,
  setAccessToken,
  setAuth,
  setRefreshToken,
} from '@/store/features/authSlice';

export default function Signin() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let isValid = true;

    if (!email.trim() || !password.trim()) {
      setError('Заполните все поля');
      isValid = false;
    }
    return isValid;
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setError('');
    setIsLoading(true);
    Login({ email, password })
      .then((res) => {
        const authUser = extractAuthUser(res, {
          email,
          username: res.username,
        });
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser));
        dispatch(setAuth(authUser));
        return getTokens({ email, password });
      })
      .then((res) => {
        dispatch(setAccessToken(res.access));
        dispatch(setRefreshToken(res.refresh));
        router.replace('/music/main');
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          if (err.response) {
            setError(err.response.data.message);
          } else if (err.request) {
            setError('Отсутствует интернет');
          } else {
            setError(`Неизвестная ошибка: ${err.message}`);
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <a href="/music/main">
        <div className={styles.modal__logo}>
          <Image
            src="/img/logo_modal.png"
            alt="logo"
            width={250}
            height={170}
          />
        </div>
      </a>
      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="email"
        placeholder="Почта"
        onChange={handleChangeEmail}
      />
      <input
        className={classNames(styles.modal__input)}
        type="password"
        name="password"
        placeholder="Пароль"
        onChange={handleChangePassword}
      />
      {error ? <div className={styles.errorContainer}>{error}</div> : <></>}
      <button
        disabled={isLoading}
        onClick={handleSubmit}
        className={styles.modal__btnEnter}
      >
        Войти
      </button>
      <Link href={'/auth/signup'} className={styles.modal__btnSignup}>
        Зарегистрироваться
      </Link>
    </>
  );
}
