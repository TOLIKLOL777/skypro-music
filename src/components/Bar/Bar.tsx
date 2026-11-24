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
import { useLikeTrack } from '@/hooks/useLikeTracks';
import { toast } from 'react-toastify';

export default function Bar() {
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const isShuffle = useAppSelector((state) => state.tracks.isShuffle);
  const dispatch = useAppDispatch();

  const [isLoop, setIsLoop] = useState(false);
  const [timePanel, setTimePanel] = useState('0:00 / 0:00');
  const [volume, setVolume] = useState(0.5);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const prevVolumeRef = useRef(0.5);
  const { toggleLike, isLike } = useLikeTrack(currentTrack);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setIsLoaded(false);
  }, [currentTrack]);

  if (!currentTrack) return <></>;

  const playTrack = () => {
    audioRef.current
      ?.play()
      .then(() => {
        if (audioRef.current) {
          audioRef.current.volume = volume;
        }
        dispatch(setIsPlay(true));
      })
      .catch(() => {
        toast.error('Не удалось воспроизвести трек');
      });
  };

  const pauseTrack = () => {
    audioRef.current?.pause();
    dispatch(setIsPlay(false));
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = prevVolumeRef.current;
        setVolume(prevVolumeRef.current);
        setIsMuted(false);
      } else {
        prevVolumeRef.current = volume > 0 ? volume : 0.5;
        audioRef.current.volume = 0;
        setVolume(0);
        setIsMuted(true);
      }
    }
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
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
              <button
                type="button"
                onClick={onPrevTrack}
                className={classNames(styles.player__btnPrev, styles.btn)}
                aria-label="Предыдущий трек"
              >
                <svg className={styles.player__btnPrevSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </button>
              <button
                type="button"
                className={classNames(styles.player__btnPlay, styles.btn)}
                onClick={isPlay ? pauseTrack : playTrack}
                aria-label={isPlay ? 'Пауза' : 'Воспроизведение'}
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
              </button>
              <button
                type="button"
                onClick={onNextTrack}
                className={classNames(styles.player__btnNext, styles.btn)}
                aria-label="Следующий трек"
              >
                <svg className={styles.player__btnNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </button>
              <button
                type="button"
                className={classNames(
                  styles.player__btnRepeat,
                  styles.btnIcon,
                  {
                    [styles.player__btnActive]: isLoop,
                  },
                )}
                onClick={() => setIsLoop(!isLoop)}
                aria-label="Повтор трека"
              >
                <svg className={styles.player__btnRepeatSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </button>
              <button
                type="button"
                className={classNames(
                  styles.player__btnShuffle,
                  styles.btnIcon,
                  {
                    [styles.player__btnActive]: isShuffle,
                  },
                )}
                onClick={onToggleShuffle}
                aria-label="Перемешать треки"
              >
                <svg className={styles.player__btnShuffleSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </button>
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
                    {currentTrack.name
                      ? currentTrack.name.slice(0, 4) + '...'
                      : currentTrack.name}
                  </Link>
                </div>
                <div className={styles.trackPlay__album}>
                  <Link className={styles.trackPlay__albumLink} href="">
                    {currentTrack.author}
                  </Link>
                </div>
              </div>

              <div className={styles.trackPlay__likeDis}>
                <button
                  type="button"
                  className={classNames(
                    styles.trackPlay__like,
                    styles.btnIcon,
                    {
                      [styles.trackPlay__like_active]: isLike,
                    },
                  )}
                  onClick={toggleLike}
                  aria-label={
                    isLike ? 'Удалить из избранного' : 'Добавить в избранное'
                  }
                  title={
                    isLike ? 'Удалить из избранного' : 'Добавить в избранное'
                  }
                >
                  <svg className={styles.trackPlay__likeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.bar__volumeBlock}>
            <div className={styles.volume__content}>
              <button
                type="button"
                className={classNames(styles.volume__image, styles.btn)}
                onClick={toggleMute}
                aria-label={isMuted ? 'Включить звук' : 'Выключить звук'}
                title={isMuted ? 'Включить звук' : 'Выключить звук'}
              >
                <svg className={styles.volume__svg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                </svg>
              </button>
              <div className={classNames(styles.volume__progress, styles.btn)}>
                <input
                  className={classNames(
                    styles.volume__progressLine,
                    styles.btn,
                  )}
                  type="range"
                  name="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume * 100}
                  onChange={(e) => {
                    const newVolume = Number(e.target.value);
                    setVolume(newVolume / 100);
                    if (isMuted && newVolume > 0) {
                      setIsMuted(false);
                    }
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
