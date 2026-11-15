import Link from 'next/link';
import classNames from 'classnames';
import styles from './CenterBlock.module.css';
import { SearchBlock } from '../Search/SearchBlock';
import Track from '@/components/Track/Track';
import Filter from '../Filter/Filter';
import { TrackType } from '@/sharedTypes/sharedTypes';

type TrackProps = {
  tracks: TrackType[];
  title?: string;
};

export function CenterBlock({ tracks, title = 'Треки' }: TrackProps) {
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
          {tracks.length === 0 ? (
            <p className={styles.content_null}>В этом плейлисте нет треков</p>
          ) : (
            tracks.map((track) => (
              <Track key={track._id} track={track} playlist={tracks} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
