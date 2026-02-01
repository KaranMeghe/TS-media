/** @format */

import Skeleton from '../Skeleton/Skeleton';
import { GoTrash } from 'react-icons/go';
import Button from '../../ui/Button';
import { useUsers } from './useUsers';

const RenderUsers = () => {
  const { users, isUserFetching, isDeleteUser, handleDeleteUser } = useUsers();
  return (
    <>
      {isUserFetching ? (
        <Skeleton times={users.length} />
      ) : (
        users.map((user) => (
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
        ))
      )}
    </>
  );
};

export default RenderUsers;
