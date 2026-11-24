import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { data } from '@/data';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/store/store';
import {
  setCurrentTrack,
  setIsPlay,
  setFavoriteTracks,
} from '@/store/features/trackSlice';
import { formatTime } from '@/utils/helpers';
import Track from './Track';

const mockTracks: TrackType[] = data;
const mockTrack: TrackType = data[0];

const renderWithStore = (
  component: React.ReactElement,
  store: AppStore = makeStore(),
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe('Track component', () => {
  test('Отрисовка всех данных трека (название, автор, альбом, время)', () => {
    renderWithStore(<Track track={mockTrack} playlist={mockTracks} />);

    expect(screen.getByText(mockTrack.author)).toBeInTheDocument();
    expect(screen.getAllByText(mockTrack.name).length).toBeGreaterThan(0);
    expect(screen.getAllByText(mockTrack.album).length).toBeGreaterThan(0);
    expect(
      screen.getByText(formatTime(mockTrack.duration_in_seconds)),
    ).toBeInTheDocument();
  });

  test('Неактивный трек отображает иконку ноты и не содержит точку проигрывания', () => {
    const { container } = renderWithStore(
      <Track track={mockTrack} playlist={mockTracks} />,
    );

    const noteUse = container.querySelector('.track__titleSvg use');
    expect(noteUse?.getAttribute('xlink:href')).toContain('#icon-note');

    const point = container.querySelector('.point');
    expect(point).not.toBeInTheDocument();
  });

  test('Клик по треку обновляет currentTrack, playlist и запускает воспроизведение (isPlay: true)', () => {
    const { store } = renderWithStore(
      <Track track={mockTrack} playlist={mockTracks} />,
    );

    const trackElement = screen
      .getByText(mockTrack.author)
      .closest('.playlist__item');
    expect(trackElement).toBeInTheDocument();

    fireEvent.click(trackElement!);

    const state = store.getState().tracks;
    expect(state.currentTrack?._id).toBe(mockTrack._id);
    expect(state.playlist).toEqual(mockTracks);
    expect(state.isPlay).toBe(true);
  });

  test('Активный трек при воспроизведении отображает пульсирующую точку (pointActive)', () => {
    const store = makeStore();
    store.dispatch(setCurrentTrack(mockTrack));
    store.dispatch(setIsPlay(true));

    const { container } = renderWithStore(
      <Track track={mockTrack} playlist={mockTracks} />,
      store,
    );

    const point = container.querySelector('.point');
    expect(point).toBeInTheDocument();
    expect(point?.className).toMatch(/pointActive/);

    const noteSvg = container.querySelector('.track__titleSvg');
    expect(noteSvg).not.toBeInTheDocument();
  });

  test('Активный трек на паузе отображает статичную точку (без pointActive)', () => {
    const store = makeStore();
    store.dispatch(setCurrentTrack(mockTrack));
    store.dispatch(setIsPlay(false));

    const { container } = renderWithStore(
      <Track track={mockTrack} playlist={mockTracks} />,
      store,
    );

    const point = container.querySelector('.point');
    expect(point).toBeInTheDocument();
    expect(point?.className).not.toMatch(/pointActive/);
  });

  test('Отображение иконки дизлайка для нелайкнутого трека', () => {
    const store = makeStore();
    store.dispatch(setFavoriteTracks([]));

    const { container } = renderWithStore(
      <Track track={mockTrack} playlist={mockTracks} />,
      store,
    );

    const dislikeUse = container.querySelector('.track__timeSvg use');
    expect(dislikeUse?.getAttribute('xlink:href')).toContain('#icon-dislike');
  });

  test('Отображение иконки лайка для трека из избранного', () => {
    const store = makeStore();
    store.dispatch(setFavoriteTracks([mockTrack]));

    const { container } = renderWithStore(
      <Track track={mockTrack} playlist={mockTracks} />,
      store,
    );

    const likeUse = container.querySelector('.track__timeSvg use');
    expect(likeUse?.getAttribute('xlink:href')).toContain('#icon-like');
  });

  test('Клик по иконке лайка останавливает всплытие события (stopPropagation) и не запускает трек', () => {
    const store = makeStore();

    const { container } = renderWithStore(
      <Track track={mockTrack} playlist={mockTracks} />,
      store,
    );

    const likeSvg = container.querySelector('.track__timeSvg');
    expect(likeSvg).toBeInTheDocument();

    fireEvent.click(likeSvg!);

    expect(store.getState().tracks.currentTrack).toBeNull();
  });
});
