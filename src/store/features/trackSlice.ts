import { TrackType } from '@/sharedTypes/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  currentTrack: null | TrackType;
  isPlay: boolean;
  playlist: TrackType[];
  shuffledPlaylist: TrackType[];
  favoriteTracks: TrackType[];
  isShuffle: boolean;
  allTracks: TrackType[];
  fetchError: null | string;
  fetchIsLoading: boolean;
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  playlist: [],
  shuffledPlaylist: [],
  favoriteTracks: [],
  isShuffle: false,
  allTracks: [],
  fetchError: null,
  fetchIsLoading: true,
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
    setAllTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.allTracks = action.payload;
    },
    setFavoriteTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.favoriteTracks = action.payload;
    },
    addLikedTracks: (state, action: PayloadAction<TrackType>) => {
      const isExist = state.favoriteTracks.some(
        (track) => track._id === action.payload._id,
      );
      if (!isExist) {
        state.favoriteTracks.push(action.payload);
      }
    },
    removeLikedTracks: (state, action: PayloadAction<TrackType>) => {
      state.favoriteTracks = state.favoriteTracks.filter(
        (track) => track._id !== action.payload._id,
      );
    },
    setFetchError: (state, action: PayloadAction<null | string>) => {
      state.fetchError = action.payload;
    },
    setFetchIsLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchIsLoading = action.payload;
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
  setAllTracks,
  setFetchError,
  setFetchIsLoading,
  setFavoriteTracks,
  addLikedTracks,
  removeLikedTracks,
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
