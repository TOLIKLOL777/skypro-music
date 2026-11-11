import { PlaylistType, TrackType } from '@/sharedTypes/sharedTypes';
import styles from './TracksSection.module.css';
import { CenterBlock } from '@/components/CenterBlock/CenterBlock';
import { use } from 'react';

type TracksResult = {
  tracks: TrackType[];
  error: string;
};

type PlaylistResult = {
  playlist: PlaylistType | null;
  error: string;
};

export default function TracksSection({
  tracksPromise,
  playlistPromise = null,
  onReload,
}: {
  tracksPromise: Promise<TracksResult> | null;
  playlistPromise?: Promise<PlaylistResult> | null;
  onReload: () => void;
}) {
  if (!tracksPromise) {
    return <p className={styles.loading}>Загрузка музыки...</p>;
  }

  const { tracks, error: tracksError } = use(tracksPromise);
  const playlistData = playlistPromise ? use(playlistPromise) : null;

  const error = tracksError || playlistData?.error;

  if (error) {
    return (
      <div className={styles.center_error_wrapper}>
        <div className={styles.error_message}>
          <p className={styles.error_text}>{error}</p>
          <button className={styles.error_button} onClick={onReload}>
            Перезагрузить страницу
          </button>
        </div>
      </div>
    );
  }

  const playlist = playlistData?.playlist;
  const trackMap = new Map(tracks.map((track) => [track._id, track]));
  const displayedTracks = playlist?.items
    ? playlist.items
        .map((id) => trackMap.get(id))
        .filter((track): track is TrackType => Boolean(track))
    : tracks;

  return (
    <CenterBlock tracks={displayedTracks} title={playlist?.name || 'Треки'} />
  );
}
