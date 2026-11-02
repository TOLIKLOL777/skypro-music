import Link from 'next/link';
import styles from './Track.module.css';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { formatTime } from '@/utils/helpers';

type TrackProps = {
  track: TrackType;
};

export default function Track({ track }: TrackProps) {
  const { name, author, album, duration_in_seconds } = track;

  return (
    <div className={styles.playlist__item}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            <svg className={styles.track__titleSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
            </svg>
          </div>
          <div>
            <Link className={styles.track__titleLink} href="">
              {name} <span className={styles.track__titleSpan}></span>
            </Link>
          </div>
        </div>
        <div className={styles.track__author}>
          <Link className={styles.track__authorLink} href="">
            {author}
          </Link>
        </div>
        <div className={styles.track__album}>
          <Link className={styles.track__albumLink} href="">
            {album}
          </Link>
        </div>
        <div className={styles.track__time}>
          <svg className={styles.track__timeSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
          </svg>
          <span className={styles.track__timeText}>
            {formatTime(duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
