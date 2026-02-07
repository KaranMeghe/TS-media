/** @format */
import Button from '../../ui/Button';
import { GoTrash } from 'react-icons/go';
import ExpandablePanel from '../../ui/Panel';
import type { AlbumItemProps } from './album.type';

const AlbumItem = ({ album, isAlbumLoading }: AlbumItemProps) => {
  const header = (
    <div className='my-2 border rounded'>
      <div className='flex p-2 justify-between items-center cursor-pointer'>
        <div className='flex gap-2'>
          <Button
            isLoading={isAlbumLoading}
            onClick={() => console.log('album delete')}
            className='border rounded-full p-1 bg-red-500 text-white'>
            <GoTrash />
          </Button>
          {album.title}
        </div>
      </div>
    </div>
  );
  return (
    <div className='my-2'>
      <ExpandablePanel header={header}>
        <p>Photos</p>
      </ExpandablePanel>
    </div>
  );
};

export default AlbumItem;
