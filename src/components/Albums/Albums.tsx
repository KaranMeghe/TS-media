/** @format */

import type { AlbumsProps } from './album.type';
import AlbumList from './AlbumList';
import AlbumTitle from './AlbumTitle';

const Albums = ({ user }: AlbumsProps) => {
  return (
    <>
      <AlbumTitle user={user} />
      <AlbumList user={user} />
    </>
  );
};

export default Albums;
