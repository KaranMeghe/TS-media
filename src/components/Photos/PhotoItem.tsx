/** @format */
import Button from '../../ui/Button';
import { GoTrash } from 'react-icons/go';
import type { PhotoItemProps } from './photos.types';
import usePhotos from './usePhotos';

const PhotoItem = ({ photo }: PhotoItemProps) => {
  const { handleDeletePhoto, deletePhotoresult } = usePhotos();

  return (
    <div className='shrink-0 relative m-2 group'>
      <img
        src={photo.url}
        alt={`Photo ${photo.id}`}
        loading='lazy'
        className='w-48 h-48 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer'
      />
      <Button
        isLoading={deletePhotoresult.isLoading}
        onClick={() => handleDeletePhoto(photo)}
        className='absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg'>
        <GoTrash size={16} />
      </Button>
    </div>
  );
};

export default PhotoItem;
