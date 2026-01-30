/** @format */

export interface USER {
  id: string;
  name: string;
}

export interface UsersProps {
  users: USER[];
  isUserFetching: boolean;
  isUserCreating: boolean;
  fetchError: null | string;
  createUserError: null | string;
}
