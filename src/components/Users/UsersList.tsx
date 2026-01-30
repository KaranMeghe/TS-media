/** @format */

import Button from '../../ui/Button';
import RenderUsers from './RenderUsers';
import { useUsers } from './useUsers';

const UsersList = () => {
  const { users, isUserFetching, fetchError, isUserCreating, createUserError, handleAddClick } = useUsers();

  {
    if (fetchError) return <div>{fetchError}</div>;
  }

  return (
    <>
      <div className='flex flex-row justify-between items-center m-3 p-2'>
        <h1 className='m2 text-xl'>Users</h1>
        <div className='flex flex-col'>
          <Button isLoading={isUserCreating} className='border-2 py-1 px-2' onClick={handleAddClick}>
            + Add User
          </Button>
          {createUserError && <p className='text-red-500 my-1'>{createUserError}</p>}
        </div>
      </div>
      <RenderUsers isUserFetching={isUserFetching} users={users} />
    </>
  );
};

export default UsersList;
