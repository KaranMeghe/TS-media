/** @format */

import Header from '../../ui/Header/Header';
import type { AlbumTitleProps } from './album.type';
import useAlbum from './useAlbum';

const AlbumTitle = ({ user }: AlbumTitleProps) => {
  const { handleAddAlbum, results } = useAlbum();
  console.log('Result', results);

  return (
    <div className='flex justify-between items-center mb-6 px-4'>
      <Header
        handleClick={() => handleAddAlbum(user)}
        isCreating={results.isLoading}
        error={results.isError}
        btnTxt='+ Add Album'>
        Albums for user {user.name}
      </Header>
    </div>
  );
};

export default AlbumTitle;
