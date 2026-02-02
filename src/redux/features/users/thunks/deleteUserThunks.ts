/** @format */

import { createAsyncThunk } from '@reduxjs/toolkit';
import type { USER } from '../users.types';
import axios from 'axios';

export const deleteUser = createAsyncThunk<USER, USER>('users/delete', async (user) => {
  const response = await axios.delete(`http://localhost:3005/users/${user.id}`);
  return response.data;
});
