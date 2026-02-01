/** @format */

import Button from '../../ui/Button';
import { useUsers } from './useUsers';

const Header = () => {
  const { isUserCreating, handleAddClick, createUserError } = useUsers();
  return (
    <>
      <h1 className='m2 text-xl'>Users</h1>
      <div className='flex flex-col'>
        <Button isLoading={isUserCreating} className='border-2 py-1 px-2' onClick={handleAddClick}>
          + Add User
        </Button>
        {createUserError && <p className='text-red-500 my-1'>{createUserError}</p>}
      </div>
    </>
  );
};

export default Header;
