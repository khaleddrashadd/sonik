import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const key = import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY;

export const shazamApi = createApi({
  reducerPath: 'shazamApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com',
    prepareHeaders: headers => {
      headers.set('X-RapidAPI-Key', key);
      return headers;
    },
  }),
  endpoints: builder => ({
    getTopSong: builder.query({
      query: () => '/v1/charts/world',
    }),
    getSongDetails: builder.query({
      query: songid => `/v1/tracks/details?track_id=${songid}`,
    }),
    getSongRelated: builder.query({
      query: songid => `/v1/tracks/related?track_id=${songid}`,
    }),
    getArtistDetails: builder.query({
      query: artistId => `/v2/artists/details?artist_id=${artistId}`,
    }),
    getSongsByCountry: builder.query({
      query: country => `/v1/charts/country?country_code=${country}`,
    }),
    getSongsByGenre: builder.query({
      query: genre => `/v1/charts/genre-world?genre_code=${genre}`,
    }),
    getSongsBySearch: builder.query({
      query: query =>
        `/v1/search/multi?query=${query}&search_type=SONGS_ARTISTS`,
    }),
  }),
});

export const {
  useGetTopSongQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetSongsByCountryQuery,
  useGetSongsByGenreQuery,
  useGetSongsBySearchQuery,
} = shazamApi;
