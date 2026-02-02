/** @format */

import { createSlice } from '@reduxjs/toolkit';
import type { UsersProps } from './users.types';
import { fetchUsers } from './thunks/fetchUsersThunks';
import { addNewUser } from './thunks/addNewUserThunks';
import { deleteUser } from './thunks/deleteUserThunks';

const initialState: UsersProps = {
  users: [],
  isUserFetching: false,
  isUserCreating: false,
  isDeleteUser: false,
  fetchError: null,
  createUserError: null,
  deleteUserError: null,
};
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // Fetching users
    builder.addCase(fetchUsers.pending, (state) => {
      state.isUserFetching = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isUserFetching = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isUserFetching = false;
      state.fetchError = action.error.message ?? 'Something went wrong';
    });

    // Creating new user
    builder.addCase(addNewUser.pending, (state) => {
      state.isUserCreating = true;
    });
    builder.addCase(addNewUser.fulfilled, (state, action) => {
      state.isUserCreating = false;
      state.users.push(action.payload);
    });
    builder.addCase(addNewUser.rejected, (state, action) => {
      state.isUserCreating = false;
      state.createUserError = action.error.message ?? 'Something went wrong';
    });

    // Delete user
    builder.addCase(deleteUser.pending, (state) => {
      state.isDeleteUser = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isDeleteUser = false;
      state.users = state.users.filter((user) => user.id !== action.payload.id);
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.isDeleteUser = false;
      state.deleteUserError = action.error.message ?? 'Something went wrong';
    });
  },
});

export const usersReducer = usersSlice.reducer;
