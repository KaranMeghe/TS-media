/** @format */
import type { USER } from '../../redux/features/users/users.types';
export interface RenderUsersProps {
  users: USER[];
  isUserFetching: boolean;
}

export interface UserItemProps {
  user: USER;
  isDeleteUser: boolean;
  handleDeleteUser: (user: USER) => void;
}
