import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const key = import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY;
console.log(key);

export const shazamApi = createApi({
  reducerPath: 'shazamApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
    prepareHeaders: headers => {
      headers.set('X-RapidAPI-Key', key);
      return headers;
    },
  }),
  endpoints: builder => ({
    getTopSong: builder.query({
      query: () => '/charts/world',
    }),
  }),
});

export const { useGetTopSongQuery } = shazamApi;
console.log(import.meta.env);
