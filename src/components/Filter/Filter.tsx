'use client';

import { useState } from 'react';
import { data } from '@/data';
import FilterItem from '../FilterItem/FilterItem';
import styles from '../Filter/Filter.module.css';

type FilterKey = 'author' | 'year' | 'genre';

const unique = (values: string[]) =>
  Array.from(new Set(values)).filter((value) => value !== '-');

const authors = unique(data.map((track) => track.author));
const genres = unique(data.flatMap((track) => track.genre));

const filters: { key: FilterKey; title: string; list: string[] }[] = [
  { key: 'author', title: 'исполнителю', list: authors },
  {
    key: 'year',
    title: 'году выпуска',
    list: ['По умолчанию', 'Сначала новые', 'Сначала старые'],
  },
  { key: 'genre', title: 'жанру', list: genres },
];

export default function Filter() {
  const [activeFilter, setActiveFilter] = useState<FilterKey | null>(null);

  const handleClick = (key: FilterKey) => {
    setActiveFilter((prev) => (prev === key ? null : key));
  };

  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>
      {filters.map(({ key, title, list }) => (
        <FilterItem
          key={key}
          title={title}
          list={list}
          isActive={activeFilter === key}
          onClick={() => handleClick(key)}
        />
      ))}
    </div>
  );
}
