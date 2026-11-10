'use client';

import { useState } from 'react';
import FilterItem from '../FilterItem/FilterItem';
import styles from '../Filter/Filter.module.css';
import { TrackType } from '@/sharedTypes/sharedTypes';

type FilterKey = 'author' | 'year' | 'genre';
type TrackProps = {
  tracks: TrackType[];
};
const unique = (values: string[]) =>
  Array.from(new Set(values)).filter((value) => value !== '-');

export default function Filter({ tracks }: TrackProps) {
  const [activeFilter, setActiveFilter] = useState<FilterKey | null>(null);
  const authors = unique(tracks.map((track) => track.author));
  const genres = unique(tracks.flatMap((track) => track.genre));

  const filters: { key: FilterKey; title: string; list: string[] }[] = [
    { key: 'author', title: 'исполнителю', list: authors },
    {
      key: 'year',
      title: 'году выпуска',
      list: ['По умолчанию', 'Сначала новые', 'Сначала старые'],
    },
    { key: 'genre', title: 'жанру', list: genres },
  ];

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
