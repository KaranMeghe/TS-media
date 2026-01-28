/** @format */

export interface USER {
  id: string;
  name: string;
}

export interface UsersProps {
  users: USER[];
  isLoading: boolean;
  error: string | null;
}
