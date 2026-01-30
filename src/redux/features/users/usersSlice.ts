/** @format */

import { createSlice } from '@reduxjs/toolkit';
import type { UsersProps } from './users.types';
import { fetchUsers } from './thunks/fetchUsersThunks';
import { addNewUser } from './thunks/addNewUserThunks';

const initialState: UsersProps = {
  users: [],
  isUserFetching: false,
  isUserCreating: false,
  fetchError: null,
  createUserError: null,
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
  },
});

export const usersReducer = usersSlice.reducer;
