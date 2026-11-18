'use client';

import classNames from 'classnames';
import styles from './CenterBlock.module.css';
import { SearchBlock } from '../Search/SearchBlock';
import Track from '@/components/Track/Track';
import Filter from '../Filter/Filter';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { resetFilters } from '@/store/features/trackSlice';

type TrackProps = {
  tracks: TrackType[];
  title?: string;
};

export function CenterBlock({ tracks, title = 'Треки' }: TrackProps) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetFilters());

    return () => {
      dispatch(resetFilters());
    };
  }, [pathname, dispatch]);

  const { authors, genres, years, search } = useAppSelector(
    (state) => state.tracks.filters,
  );

  const filteredTracks = useMemo(() => {
    let result = [...tracks];

    if (authors.length > 0) {
      result = result.filter((track) => authors.includes(track.author));
    }

    if (genres.length > 0) {
      result = result.filter((track) =>
        track.genre?.some((g) => genres.includes(g)),
      );
    }

    if (years === 'Сначала новые') {
      result.sort(
        (a, b) =>
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime(),
      );
    } else if (years === 'Сначала старые') {
      result.sort(
        (a, b) =>
          new Date(a.release_date).getTime() -
          new Date(b.release_date).getTime(),
      );
    }

    if (search.length > 0) {
      result = result.filter((track) =>
        track.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return result;
  }, [tracks, authors, genres, years, search]);

  return (
    <div className={styles.centerblock}>
      <SearchBlock />
      <h2 className={styles.centerblock__h2}>{title}</h2>
      <Filter tracks={tracks} />
      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={classNames(styles.playlistTitle__col, styles.col01)}>
            Трек
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col02)}>
            Исполнитель
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col03)}>
            Альбом
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col04)}>
            <svg className={styles.playlistTitle__svg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        <div className={styles.content__playlist}>
          {filteredTracks.length === 0 ? (
            <p className={styles.content_null}>В этом плейлисте нет треков</p>
          ) : (
            filteredTracks.map((track) => (
              <Track key={track._id} track={track} playlist={filteredTracks} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
