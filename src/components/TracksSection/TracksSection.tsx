import { TrackType } from '@/sharedTypes/sharedTypes';
import styles from './TracksSection.module.css';
import { CenterBlock } from '@/components/CenterBlock/CenterBlock';
import { use } from 'react';

type TracksResult = {
  tracks: TrackType[];
  error: string;
};

export default function TracksSection({
  tracksPromise,
  onReload,
}: {
  tracksPromise: Promise<TracksResult> | null;
  onReload: () => void;
}) {
  if (!tracksPromise) {
    return <p className={styles.loading}>Загрузка музыки...</p>;
  }

  const { tracks, error } = use(tracksPromise);

  if (error) {
    return (
      <div className={styles.center_error_wrapper}>
        <div className={styles.error_message}>
          <p className={styles.error_text}>{error}</p>
          <button className={styles.error_button} onClick={onReload}>
            Перезагрузить страницу
          </button>
        </div>
        <CenterBlock tracks={tracks} />
      </div>
    );
  }

  return <CenterBlock tracks={tracks} />;
}
