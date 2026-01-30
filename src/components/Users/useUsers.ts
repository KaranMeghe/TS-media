/** @format */
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import { fetchUsers } from '../../redux/features/users/thunks/fetchUsersThunks';
import { addNewUser } from '../../redux/features/users/thunks/addNewUserThunks';

export const useUsers = () => {
  const dispatch = useAppDispatch();
  const { users, isUserCreating, isUserFetching, fetchError, createUserError } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddClick = () => {
    dispatch(addNewUser());
  };

  return { users, handleAddClick, isUserCreating, isUserFetching, fetchError, createUserError };
};
