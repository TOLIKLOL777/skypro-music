'use client';

import { getTokens, Register } from '@/services/auth/authapi';
import styles from './signup.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { useState } from 'react';
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
import Image from 'next/image';

export default function SignUp() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let isValid = true;

    if (!username.trim() || !email.trim() || !password.trim()) {
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

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setError('');
    setIsLoading(true);
    Register({ email, password, username })
      .then((res) => {
        const authUser = extractAuthUser(res, { email, username });
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
            const data = err.response.data as { message?: string } | string;
            setError(
              typeof data === 'string'
                ? data
                : data?.message || 'Ошибка регистрации',
            );
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
      <Link href="/music/main">
        <div className={styles.modal__logo}>
          <Image
            src="/img/logo_modal.png"
            alt="logo"
            width={250}
            height={170}
          />
        </div>
      </Link>
      <input
        onChange={handleChangeUsername}
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="username"
        placeholder="Имя пользователя"
      />
      <input
        onChange={handleChangeEmail}
        className={styles.modal__input}
        type="text"
        name="email"
        placeholder="Почта"
      />
      <input
        onChange={handleChangePassword}
        className={styles.modal__input}
        type="password"
        name="password"
        placeholder="Пароль"
      />
      {error ? <div className={styles.errorContainer}>{error}</div> : <></>}
      <button
        disabled={isLoading}
        onClick={handleSubmit}
        className={styles.modal__btnSignupEnt}
      >
        Зарегистрироваться
      </button>
    </>
  );
}
