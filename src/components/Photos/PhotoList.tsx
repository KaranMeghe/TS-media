/** @format */
import { useFetchPhotosQuery } from '../../redux/api/photos/photosApi';
import type { PhotoData, PhotoListProps } from './photos.types';
import Skeleton from '../Skeleton/Skeleton';
import PhotoItem from './PhotoItem';

/** @format */
const PhotoList = ({ album }: PhotoListProps) => {
  const { data, error, isLoading } = useFetchPhotosQuery(album.id);
  const skeletonCount = data?.length;

  {
    if (error) return <div>Error Loading Photos</div>;
  }

  return (
    <div className='flex flex-nowrap gap-4 w-full overflow-x-auto overflow-y-hidden p-4'>
      {isLoading ? (
        <Skeleton times={skeletonCount} />
      ) : (
        data
          ?.filter((photo: PhotoData) => photo.albumId === album.id)
          .map((photo: PhotoData) => <PhotoItem key={photo.id} photo={photo} />)
      )}
    </div>
  );
};

export default PhotoList;
