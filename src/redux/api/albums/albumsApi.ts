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

      fetchAlbums: builder.query<AlbumData[], string>({
        query: (userId) => {
          return {
            url: '/albums',
            params: {
              userId: userId,
            },
            method: 'GET',
          };
        },
        providesTags: (_data, _error, userId) => {
          return [{ type: 'Album', id: userId }];
        },
      }),

      removeAlbum: builder.mutation<AlbumData, { album: AlbumData; user: USER }>({
        query: ({ album }) => {
          return {
            url: `/albums/${album.id}`,
            method: 'DELETE',
          };
        },
        invalidatesTags: (_data, _error, { user }) => {
          return [{ type: 'Album', id: user.id }];
        },
      }),
    };
  },
});

export const { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation } = albumsApi;
export { albumsApi };
