/** @format */

import type { AlbumsProps } from './album.type';
import { useFetchAlbumsQuery } from '../../redux/api/albums/albumsApi';
import Skeleton from '../Skeleton/Skeleton';
import AlbumItem from './AlbumItem';

const AlbumList = ({ user }: AlbumsProps) => {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);
  const skeletonCount = data?.length;

  {
    if (error) return <div>Error Loading Albums</div>;
  }

  return (
    <div className='flex flex-col w-[80%] mx-auto'>
      {isLoading ? (
        <Skeleton times={skeletonCount} />
      ) : (
        data?.map((album) => <AlbumItem key={album.id} album={album} isAlbumLoading={isLoading} />)
      )}
    </div>
  );
};

export default AlbumList;
