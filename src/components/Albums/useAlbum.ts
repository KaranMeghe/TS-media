/** @format */

import { useAddAlbumMutation } from '../../redux/api/albums/albumsApi';
import type { USER } from '../../redux/features/users/users.types';

const useAlbum = () => {
  const [addAlbum, results] = useAddAlbumMutation();

  const handleAddAlbum = (user: USER) => {
    addAlbum(user);
  };

  return { handleAddAlbum, results };
};

export default useAlbum;
