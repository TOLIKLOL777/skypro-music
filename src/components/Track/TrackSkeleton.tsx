'use client';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './Track.module.css';

export function TrackSkeleton() {
  return (
    <div className={styles.playlist__item}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage} style={{ padding: 0 }}>
            <Skeleton width={51} height={51} borderRadius={0} />
          </div>
          <div>
            <Skeleton width={250} height={19} />
          </div>
        </div>
        <div className={styles.track__author}>
          <Skeleton width={200} height={19} />
        </div>
        <div className={styles.track__album}>
          <Skeleton width={180} height={19} />
        </div>
        <div className={styles.track__time}>
          <Skeleton width={40} height={19} />
        </div>
      </div>
    </div>
  );
}

export function TrackListSkeleton({ count = 8 }: { count?: number }) {
  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#444444">
      {Array.from({ length: count }).map((_, index) => (
        <TrackSkeleton key={index} />
      ))}
    </SkeletonTheme>
  );
}
