import axios from 'axios';
import { BASE_URL } from '../constants';
import { PlaylistType, TrackType } from '@/sharedTypes/sharedTypes';

export const getTracks = (): Promise<TrackType[]> => {
  return axios(`${BASE_URL}/catalog/track/all/`).then((res) => {
    return res.data.data;
  });
};

export const getPlaylist = (id: number): Promise<PlaylistType> => {
  return axios(`${BASE_URL}/catalog/selection/${id}/`).then((res) => {
    return res.data.data;
  });
};
