/** @format */

import { fetchUsers } from '../../redux/features/users/thunks/fetchUsersThunks';
import { useEffect } from 'react';
import { useAppDispatch } from '../../redux/store/hooks';

const UsersList = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return <div>Users List</div>;
};

export default UsersList;
