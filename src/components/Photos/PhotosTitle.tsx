/** @format */

import Header from '../../ui/Header/Header';
import type { PhotosProps } from './photos.types';
import usePhotos from './usePhotos';

const PhotosTitle = ({ album }: PhotosProps) => {
  const { handleAddPhoto, addPhotoresult } = usePhotos();

  return (
    <div className='flex justify-between'>
      <Header
        handleClick={() => handleAddPhoto(album)}
        isCreating={addPhotoresult.isLoading}
        error={addPhotoresult.isError}
        btnTxt='+ Add Photo'>
        Photos from album {album.title}
      </Header>
    </div>
  );
};

export default PhotosTitle;
