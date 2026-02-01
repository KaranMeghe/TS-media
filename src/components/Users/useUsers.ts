/** @format */
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import { fetchUsers } from '../../redux/features/users/thunks/fetchUsersThunks';
import { addNewUser } from '../../redux/features/users/thunks/addNewUserThunks';
import { deleteUser } from '../../redux/features/users/thunks/deleteUserThunks';
import type { USER } from '../../redux/features/users/users.types';

export const useUsers = () => {
  const dispatch = useAppDispatch();
  const { users, isUserCreating, isUserFetching, isDeleteUser, fetchError, createUserError, deleteUserError } =
    useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddClick = () => {
    dispatch(addNewUser());
  };

  const handleDeleteUser = (user: USER) => {
    dispatch(deleteUser(user));
  };

  return {
    users,
    isUserCreating,
    isUserFetching,
    isDeleteUser,
    fetchError,
    createUserError,
    deleteUserError,
    handleAddClick,
    handleDeleteUser,
  };
};
