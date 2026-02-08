/** @format */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AlbumData } from '../../../components/Albums/album.type';
import type { USER } from '../../features/users/users.types';
import { faker } from '@faker-js/faker';

const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
  }),

  tagTypes: ['Album'],

  endpoints(builder) {
    return {
      addAlbum: builder.mutation<AlbumData, USER>({
        query: (user) => {
          return {
            url: '/albums',
            method: 'POST',
            body: {
              userId: user.id,
              title: faker.commerce.productName(),
            },
          };
        },
        invalidatesTags: (data, error, user) => {
          return [{ type: 'Album', id: user.id }];
        },
      }),

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
        providesTags: (data, error, user) => {
          return [{ type: 'Album', id: user.id }];
        },
      }),
    };
  },
});

export const { useFetchAlbumsQuery, useAddAlbumMutation } = albumsApi;
export { albumsApi };
