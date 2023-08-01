import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {  RootState } from '../store/store';
import firebase from '../firebase/firebase';

interface UserState {
  uid: string | null;
}

const initialState: UserState = {
  uid: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.uid = action.payload;
    },
    logout: (state) => {
      state.uid = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.uid;

export default userSlice.reducer;


