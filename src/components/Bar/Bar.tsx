'use client';

import Link from 'next/link';
import classNames from 'classnames';
import styles from './Bar.module.css';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import {
  setIsPlay,
  setNextTrack,
  setPrevTrack,
  toggleShuffle,
} from '@/store/features/trackSlice';
import { getTimePanel } from '@/utils/helpers';
import ProgressBar from '../ProgressBar/ProgressBar';

export default function Bar() {
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const dispatch = useAppDispatch();

  const [isLoop, setIsLoop] = useState(false);
  const [timePanel, setTimePanel] = useState('0:00 / 0:00');
  const [volume, setVolume] = useState(0.5);
  const [isLoaded, setIsLoaded] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setVolume(0.5);
    setIsLoaded(false);
  }, [currentTrack]);

  if (!currentTrack) return <></>;

  const playTrack = () => {
    audioRef.current?.play();
    dispatch(setIsPlay(true));
  };

  const pauseTrack = () => {
    audioRef.current?.pause();
    dispatch(setIsPlay(false));
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      console.log('Current Time:', audioRef.current.currentTime);
      console.log('Duration:', audioRef.current.duration);
      setTimePanel(
        getTimePanel(audioRef.current.currentTime, audioRef.current.duration) ??
          '0:00 / 0:00',
      );
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      dispatch(setIsPlay(true));
      setIsLoaded(true);
      setTimePanel(
        getTimePanel(audioRef.current.currentTime, audioRef.current.duration) ??
          '0:00 / 0:00',
      );
    }
  };

  const onChangeProgress = (e: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = Number(e.target.value);
      audioRef.current.currentTime = newTime;
      setTimePanel(
        getTimePanel(audioRef.current.currentTime, audioRef.current.duration) ??
          '0:00 / 0:00',
      );
    }
  };

  const onNextTrack = () => {
    dispatch(setNextTrack());
  };

  const onPrevTrack = () => {
    dispatch(setPrevTrack());
  };

  const onToggleShuffle = () => {
    dispatch(toggleShuffle());
  };

  return (
    <div className={styles.bar}>
      <audio
        ref={audioRef}
        controls
        autoPlay
        src={currentTrack?.track_file}
        hidden
        loop={isLoop}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={() => {
          dispatch(setNextTrack());
        }}
      ></audio>
      <div className={styles.bar__content}>
        <ProgressBar
          max={audioRef.current?.duration || 0}
          value={audioRef.current?.currentTime || 0}
          step={0.1}
          onChange={onChangeProgress}
          readOnly={isLoaded ? false : true}
        />
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div onClick={onPrevTrack} className={styles.player__btnPrev}>
                <svg className={styles.player__btnPrevSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              <div
                className={classNames(styles.player__btnPlay, styles.btn)}
                onClick={isPlay ? pauseTrack : playTrack}
              >
                <svg className={styles.player__btnPlaySvg}>
                  <use
                    xlinkHref={
                      isPlay
                        ? '/img/icon/sprite.svg#icon-pause'
                        : '/img/icon/sprite.svg#icon-play'
                    }
                  ></use>
                </svg>
              </div>
              <div onClick={onNextTrack} className={styles.player__btnNext}>
                <svg className={styles.player__btnNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div
                className={classNames(styles.player__btnRepeat, styles.btnIcon)}
                onClick={() => setIsLoop(!isLoop)}
              >
                <svg className={styles.player__btnRepeatSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div
                className={classNames(
                  styles.player__btnShuffle,
                  styles.btnIcon,
                )}
                onClick={onToggleShuffle}
              >
                <svg className={styles.player__btnShuffleSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className={styles.player__trackPlay}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                  <svg className={styles.trackPlay__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.trackPlay__author}>
                  <Link className={styles.trackPlay__authorLink} href="">
                    {currentTrack.name}
                  </Link>
                </div>
                <div className={styles.trackPlay__album}>
                  <Link className={styles.trackPlay__albumLink} href="">
                    {currentTrack.author}
                  </Link>
                </div>
              </div>

              <div className={styles.trackPlay__dislike}>
                <div
                  className={classNames(
                    styles.player__btnShuffle,
                    styles.btnIcon,
                  )}
                >
                  <svg className={styles.trackPlay__likeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                  </svg>
                </div>
                <div
                  className={classNames(
                    styles.trackPlay__dislike,
                    styles.btnIcon,
                  )}
                >
                  <svg className={styles.trackPlay__dislikeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bar__volumeBlock}>
            <div className={styles.volume__content}>
              <div className={styles.volume__image}>
                <svg className={styles.volume__svg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>
              <div className={classNames(styles.volume__progress, styles.btn)}>
                <input
                  className={classNames(
                    styles.volume__progressLine,
                    styles.btn,
                  )}
                  type="range"
                  name="range"
                  onChange={(e) => {
                    const newVolume = Number(e.target.value);
                    setVolume(newVolume / 100);
                    if (audioRef.current) {
                      audioRef.current.volume = newVolume / 100;
                    }
                  }}
                />
              </div>
              <div className={styles.volume__time}>
                <span className={styles.volume__timeText}>{timePanel}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
