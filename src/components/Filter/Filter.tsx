'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import FilterItem from '../FilterItem/FilterItem';
import styles from './Filter.module.css';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setFilterAuthors,
  setFilterGenres,
  setFilterYears,
} from '@/store/features/trackSlice';

type FilterKey = 'author' | 'year' | 'genre';
type TrackProps = {
  tracks: TrackType[];
};
const unique = (values: string[]) =>
  Array.from(new Set(values)).filter((value) => value !== '-');

export default function Filter({ tracks }: TrackProps) {
  const [activeFilter, setActiveFilter] = useState<FilterKey | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setActiveFilter(null);
  }, [pathname]);
  const authors = unique(tracks.map((track) => track.author));
  const genres = unique(tracks.flatMap((track) => track.genre));
  const dispatch = useAppDispatch();
  const {
    authors: selectedAuthors,
    genres: selectedGenres,
    years: selectedYears,
  } = useAppSelector((state) => state.tracks.filters);

  const onAuthorSelect = (author: string) => {
    dispatch(setFilterAuthors(author));
  };

  const onGenreSelect = (genre: string) => {
    dispatch(setFilterGenres(genre));
  };

  const onYearSelect = (year: string) => {
    dispatch(setFilterYears(year));
  };

  const filters: {
    key: FilterKey;
    title: string;
    list: string[];
    action: (item: string) => void;
    selectedItems: string[];
    selectedCount: number;
  }[] = [
    {
      key: 'author',
      title: 'исполнителю',
      list: authors,
      action: onAuthorSelect,
      selectedItems: selectedAuthors,
      selectedCount: selectedAuthors.length,
    },
    {
      key: 'year',
      title: 'году выпуска',
      list: ['По умолчанию', 'Сначала новые', 'Сначала старые'],
      action: onYearSelect,
      selectedItems: [selectedYears],
      selectedCount: selectedYears !== 'По умолчанию' ? 1 : 0,
    },
    {
      key: 'genre',
      title: 'жанру',
      list: genres,
      action: onGenreSelect,
      selectedItems: selectedGenres,
      selectedCount: selectedGenres.length,
    },
  ];

  const handleClick = (key: FilterKey) => {
    setActiveFilter((prev) => (prev === key ? null : key));
  };

  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>
      {filters.map(
        ({ key, title, list, action, selectedItems, selectedCount }) => (
          <FilterItem
            key={key}
            title={title}
            list={list}
            isActive={activeFilter === key}
            onClick={() => handleClick(key)}
            onSelect={action}
            selectedItems={selectedItems}
            selectedCount={selectedCount}
          />
        ),
      )}
    </div>
  );
}
