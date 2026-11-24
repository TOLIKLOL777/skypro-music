'use client';

import { useAppDispatch, useAppSelector } from '@/store/store';
import styles from './SearchBlock.module.css';
import { setFilterSearch } from '@/store/features/trackSlice';

export function SearchBlock() {
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.tracks.filters.search);

  const onSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterSearch(e.target.value));
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
          value={search}
          onChange={onSearchInput}
        />
      </div>
    </div>
  );
}
