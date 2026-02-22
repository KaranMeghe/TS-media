/** @format */

import type { AlbumsProps } from './album.type';
import { useFetchAlbumsQuery } from '../../redux/api/albums/albumsApi';
import Skeleton from '../Skeleton/Skeleton';
import AlbumItem from './AlbumItem';

const AlbumList = ({ user }: AlbumsProps) => {
  const { data, error, isLoading } = useFetchAlbumsQuery(user.id, {
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });
  const skeletonCount = data?.length;

  {
    if (error) return <div>Error Loading Albums</div>;
  }

  return (
    <div className='flex flex-col w-full max-w-6xl mx-auto px-4 gap-2'>
      {isLoading ? (
        <Skeleton times={skeletonCount} />
      ) : (
        data?.map((album) => <AlbumItem key={album.id} album={album} user={user} />)
      )}
    </div>
  );
};

export default AlbumList;
