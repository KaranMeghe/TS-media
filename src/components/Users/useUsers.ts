/** @format */
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store/hooks';
import { fetchUsers } from '../../redux/features/users/thunks/fetchUsersThunks';

export const useUsers = () => {
  const dispatch = useAppDispatch();
  const { isLoading, users, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return { isLoading, users, error };
};
