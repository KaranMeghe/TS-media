/** @format */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AlbumData } from '../../../components/Albums/album.type';
import type { USER } from '../../features/users/users.types';
const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
  }),
  endpoints(builder) {
    return {
      fetchAlbums: builder.query<AlbumData[], USER>({
        query: (user) => {
          return {
            url: '/albums',
            params: {
              userId: user.id,
            },
            method: 'GET',
          };
        },
      }),
    };
  },
});

export const { useFetchAlbumsQuery } = albumsApi;
export { albumsApi };
