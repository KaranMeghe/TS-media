/** @format */

import Header from '../../ui/Header/Header';
import RenderUsers from './RenderUsers';
import { useUsers } from './useUsers';

const UsersList = () => {
  const { handleAddClick, isUserCreating, createUserError } = useUsers();
  return (
    <>
      <div className='flex flex-row justify-between items-center m-3 p-2'>
        <Header isCreating={isUserCreating} error={createUserError} handleClick={handleAddClick} btnTxt='+ Add User'>
          Users
        </Header>
      </div>
      <RenderUsers />
    </>
  );
};

export default UsersList;
