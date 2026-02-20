/** @format */

import type { UserItemProps } from './userUi.type';
import Button from '../../ui/Button';
import { GoTrash } from 'react-icons/go';
import ExpandablePanel from '../../ui/Panel';
import Albums from '../Albums/Albums';

const UsersListItem = ({ user, isDeleteUser, handleDeleteUser }: UserItemProps) => {
  const header = (
    <div className='mb-2 border rounded' key={user.id}>
      <div className='flex p-2 justify-between items-center cursor-pointer'>
        <div className='flex gap-2'>
          <Button
            isLoading={isDeleteUser}
            onClick={() => handleDeleteUser(user)}
            className='border rounded-full p-1 bg-red-500 text-white'>
            <GoTrash />
          </Button>
          {user.name}
        </div>
      </div>
    </div>
  );

  return (
    <ExpandablePanel header={header}>
      <Albums user={user} />
    </ExpandablePanel>
  );
};

export default UsersListItem;
