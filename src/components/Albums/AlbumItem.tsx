/** @format */
import Button from '../../ui/Button';
import { GoTrash } from 'react-icons/go';
import ExpandablePanel from '../../ui/Panel';
import type { AlbumItemProps } from './album.type';
import useAlbum from './useAlbum';

const AlbumItem = ({ album }: AlbumItemProps) => {
  const { handleRemoveAlbum, reslutsAlbum } = useAlbum();

  const header = (
    <div className='my-2 border rounded'>
      <div className='flex p-2 justify-between items-center cursor-pointer'>
        <div className='flex gap-2'>
          <Button
            isLoading={reslutsAlbum.isLoading}
            onClick={() => handleRemoveAlbum(album)}
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
