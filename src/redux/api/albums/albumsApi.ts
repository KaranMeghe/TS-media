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
        invalidatesTags: (_data, _error, user) => {
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
        providesTags: (_data, _error, user) => {
          return [{ type: 'Album', id: user.id }];
        },
      }),

      removeAlbum: builder.mutation<AlbumData, AlbumData>({
        query: (album) => {
          return {
            url: `/albums/${album.id}`,
            method: 'DELETE',
          };
        },
        invalidatesTags: (_data, _error, album) => {
          return [{ type: 'Album', id: album.userId }];
        },
      }),
    };
  },
});

export const { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation } = albumsApi;
export { albumsApi };
