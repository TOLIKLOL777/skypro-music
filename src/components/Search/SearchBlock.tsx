'use client';

import styles from './SearchBlock.module.css';
import { useState } from 'react';

export function SearchBlock() {
  const [searchInput, setSearchInput] = useState('');

  const onSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className={styles.centerblock}>
      <div className={styles.centerblock__search}>
        <svg className={styles.search__svg}>
          <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
        </svg>
        <input
          className={styles.search__text}
          type="search"
          placeholder="Поиск"
          name="search"
          onChange={onSearchInput}
        />
      </div>
    </div>
  );
}
