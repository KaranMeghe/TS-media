/** @format */

// 1 create a new file for your thunk fn(), and name it after the purpose of the request
// 2 create the thunk . give it a base type that describes the purpose of the request Atcion {'users/fetch/pending'},{'users/fetch/fullfield'} 1st argument we give to createAsyncThunk('user/fetch') Base type rtk take base type and join with /pending /fullfielled /rejected automatically
// 3 In Thunk make a request and return the data that you want to use in the reducer
// 4 In the slice add extraReducers, watching for ation type make by the thunk
// 5 export the thunk
// 6 when user does something , dispatch the thunk action

import { createAsyncThunk } from '@reduxjs/toolkit';
import type { USER } from '../users.types';
import axios from 'axios';

export const fetchUsers = createAsyncThunk<USER[], void>('users/fetch', async () => {
  const response = await axios.get('http://localhost:3005/users');
  return response.data;
});

// properties that are automatically attached with fetchUsers
/* {
    fetchUsers.pending === 'users/fetch/pending' ,
    fetchUsers.fullfield === 'users/fetch/fullfielled',
    fetchUsers.rejected === 'users/fetch/rejected'
 }
*/
