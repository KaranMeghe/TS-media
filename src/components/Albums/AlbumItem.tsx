/** @format */
import Button from '../../ui/Button';
import { GoTrash } from 'react-icons/go';
import ExpandablePanel from '../../ui/Panel';
import type { AlbumItemProps } from './album.type';
import type { USER } from '../../redux/features/users/users.types';
import useAlbum from './useAlbum';
import Photos from '../Photos/Photos';

interface AlbumItemWithUserProps extends AlbumItemProps {
  user: USER;
}

const AlbumItem = ({ album, user }: AlbumItemWithUserProps) => {
  const { handleRemoveAlbum, reslutsAlbum } = useAlbum();

  const header = (
    <div className='flex gap-3 items-center font-semibold text-lg'>
      <Button
        isLoading={reslutsAlbum.isLoading}
        onClick={() => handleRemoveAlbum(album, user)}
        className='border rounded-full p-1 bg-red-500 text-white hover:bg-red-600 transition-colors'>
        <GoTrash />
      </Button>
      <span>{album.title}</span>
    </div>
  );
  return (
    <ExpandablePanel header={header}>
      <Photos album={album} />
    </ExpandablePanel>
  );
};

export default AlbumItem;
