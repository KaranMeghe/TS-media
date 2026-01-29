/** @format */

import { createSlice } from '@reduxjs/toolkit';
import type { UsersProps } from './users.types';
import { fetchUsers } from './thunks/fetchUsersThunks';

const initialState: UsersProps = {
  isLoading: false,
  users: [],
  error: null,
};
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? 'Something went wrong';
    });
  },
});

export const usersReducer = usersSlice.reducer;
