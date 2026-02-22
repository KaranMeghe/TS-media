/** @format */

import type { AlbumsProps } from './album.type';
import AlbumList from './AlbumList';
import AlbumTitle from './AlbumTitle';

const Albums = ({ user }: AlbumsProps) => {
  return (
    <div className='py-6'>
      <AlbumTitle user={user} />
      <AlbumList user={user} />
    </div>
  );
};

export default Albums;
