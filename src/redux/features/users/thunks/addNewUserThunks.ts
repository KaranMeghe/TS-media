/** @format */

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { USER } from '../users.types';
import { faker } from '@faker-js/faker';

export const addNewUser = createAsyncThunk<USER, void>('user/add', async () => {
  const response = await axios.post('http://localhost:3005/users', {
    name: faker.person.fullName(),
  });
  return response.data;
});
