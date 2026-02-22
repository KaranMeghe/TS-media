/** @format */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

const photosApi = createApi({
  reducerPath: 'photos',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
  }),
  tagTypes: ['Album'],
  endpoints(builder) {
    return {
      fetchPhotos: builder.query({
        query: (albumId) => {
          return {
            url: '/photos',
            params: {
              albumId: albumId,
            },
            method: 'GET',
          };
        },
        providesTags: (_data, _error, albumId) => {
          return [{ type: 'Album', id: albumId }];
        },
      }),

      addPhoto: builder.mutation({
        invalidatesTags: (_data, _error, album) => {
          return [{ type: 'Album', id: album.id }];
        },
        query: (album) => {
          return {
            url: '/photos',
            method: 'POST',
            body: {
              albumId: album.id,
              url: faker.image.url(),
            },
          };
        },
      }),

      deletePhoto: builder.mutation({
        invalidatesTags: (_data, _error, photo) => {
          return [{ type: 'Album', id: photo.albumId }];
        },
        query: (photo) => {
          return {
            url: `/photos/${photo.id}`,
            method: 'DELETE',
          };
        },
      }),
    };
  },
});

export const { useFetchPhotosQuery, useAddPhotoMutation, useDeletePhotoMutation } = photosApi;
export { photosApi };
