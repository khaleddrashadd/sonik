import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamApi = createApi({
  reducerPath: 'shazamApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-api7.p.rapidapi.com/',
    prepareHeaders: headers => {
      headers.set(
        'X-RapidAPI-Key',
        '7964705c8fmsh2bc7147f8c6f342p1e4b70jsn8966799c5456',
        'X-RapidAPI-Host',
        'shazam-api7.p.rapidapi.com'
      );
      return headers;
    },
  }),
  endpoints: builder => ({
    getTopSong: builder.query({
      query: () => '/charts/get-top-songs-in-world',
    }),
  }),
});

export const { useGetTopSongQuery } = shazamApi;
