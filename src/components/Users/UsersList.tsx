/** @format */

import Skeleton from '../Skeleton/Skeleton';
import { useUsers } from './useUsers';

const UsersList = () => {
  const { isLoading, users, error } = useUsers();

  {
    if (isLoading) return <Skeleton times={users.length} />;
  }

  {
    if (error) return <div>{error}</div>;
  }

  return <div>Users list</div>;
};

export default UsersList;
