/** @format */

import Header from '../../ui/Header/Header';
import type { AlbumTitleProps } from './album.type';

const AlbumTitle = ({ user }: AlbumTitleProps) => {
  return (
    <div className='flex justify-between'>
      <Header btnTxt='+ Add Album'>Albums for user {user.name}</Header>
    </div>
  );
};

export default AlbumTitle;
