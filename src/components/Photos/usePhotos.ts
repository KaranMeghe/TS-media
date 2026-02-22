/** @format */

import { useAddPhotoMutation, useDeletePhotoMutation } from '../../redux/api/photos/photosApi';
import type { AlbumData } from '../Albums/album.type';
import type { PhotoData } from './photos.types';

export const usePhotos = () => {
  const [addPhoto, addPhotoresult] = useAddPhotoMutation();
  const [deletePhoto, deletePhotoresult] = useDeletePhotoMutation();

  const handleAddPhoto = (album: AlbumData) => {
    addPhoto(album);
  };

  const handleDeletePhoto = async (photo: PhotoData) => {
    if (confirm('Are you sure you want to delete this photo?')) {
      await deletePhoto(photo);
    }
  };

  return { handleAddPhoto, handleDeletePhoto, addPhoto, deletePhoto, addPhotoresult, deletePhotoresult };
};

export default usePhotos;
