/** @format */

import Skeleton from '../Skeleton/Skeleton';
import UsersListItem from './UsersListItem';
import { useUsers } from './useUsers';

const RenderUsers = () => {
  const { users, isUserFetching, isDeleteUser, handleDeleteUser } = useUsers();
  return (
    <>
      {isUserFetching ? (
        <Skeleton times={users.length} />
      ) : (
        users.map((user) => (
          <UsersListItem user={user} isDeleteUser={isDeleteUser} handleDeleteUser={handleDeleteUser} />
        ))
      )}
    </>
  );
};

export default RenderUsers;
