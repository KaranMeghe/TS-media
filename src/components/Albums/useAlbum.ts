/** @format */

import { useAddAlbumMutation, useRemoveAlbumMutation } from '../../redux/api/albums/albumsApi';
import type { USER } from '../../redux/features/users/users.types';
import type { AlbumData } from './album.type';

const useAlbum = () => {
  const [addAlbum, results] = useAddAlbumMutation();
  const [removeAlbum, reslutsAlbum] = useRemoveAlbumMutation();

  const handleAddAlbum = (user: USER) => {
    addAlbum(user);
  };

  const handleRemoveAlbum = async (album: AlbumData) => {
    if (confirm('Are you sure you want to delete this Album ?')) {
      await removeAlbum(album);
    }
  };

  return { handleAddAlbum, handleRemoveAlbum, results, reslutsAlbum };
};

export default useAlbum;
