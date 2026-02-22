/** @format */

import PhotoList from './PhotoList';
import PhotosTitle from './PhotosTitle';
import type { PhotosProps } from './photos.types';

const Photos = ({ album }: PhotosProps) => {
  return (
    <div className='mt-4'>
      <PhotosTitle album={album} />
      <PhotoList album={album} />
    </div>
  );
};

export default Photos;
