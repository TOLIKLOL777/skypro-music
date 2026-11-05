import { TrackType } from '@/sharedTypes/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  currentTrack: null | TrackType;
  isPlay: boolean;
  playlist: TrackType[];
  shuffledPlaylist: TrackType[];
  isShuffle: boolean;
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  playlist: [],
  shuffledPlaylist: [],
  isShuffle: false,
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
    },
    setCurrentPlaylist: (state, action: PayloadAction<TrackType[]>) => {
      state.playlist = action.payload;
      state.shuffledPlaylist = [...state.playlist].sort(
        () => Math.random() - 0.5,
      );
    },
    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
    setNextTrack: (state) => {
      const playlistToUse = state.isShuffle
        ? state.shuffledPlaylist
        : state.playlist;
      if (state.currentTrack && state.playlist.length > 0) {
        const currentIndex = playlistToUse.findIndex(
          (track) => track._id === state.currentTrack?._id,
        );
        const nextIndex = (currentIndex + 1) % playlistToUse.length;
        state.currentTrack = playlistToUse[nextIndex];
      }
    },
    setPrevTrack: (state) => {
      const playlistToUse = state.isShuffle
        ? state.shuffledPlaylist
        : state.playlist;

      if (state.currentTrack && state.playlist.length > 0) {
        const currentIndex = playlistToUse.findIndex(
          (track) => track._id === state.currentTrack?._id,
        );
        const prevIndex =
          (currentIndex - 1 + playlistToUse.length) % playlistToUse.length;
        state.currentTrack = playlistToUse[prevIndex];
      }
    },
  },
});

export const {
  setCurrentTrack,
  setIsPlay,
  setCurrentPlaylist,
  setNextTrack,
  setPrevTrack,
  toggleShuffle,
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
