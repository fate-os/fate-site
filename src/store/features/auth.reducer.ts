import { AccountModel } from '@/types/app';
import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

export interface Tokens {
  accessToken: string | null;
  refreshToken: string | null;
}

export interface AuthState {
  account: AccountModel | null;
  loadingAccount: boolean;
}

const initialState: AuthState = {
  account: null,
  loadingAccount: true,
};

const slice = createSlice({
  initialState: initialState,
  name: 'auth',
  reducers: {
    accountInitialize: (state, action: PayloadAction<AccountModel>) => {
      state.account = action.payload;
      state.loadingAccount = false;
    },
    updateAccount: (state, action: PayloadAction<AccountModel>) => {
      state.account = { ...state.account, ...action.payload };
    },
    accountLoader: (state, action: PayloadAction<boolean>) => {
      state.loadingAccount = action.payload;
    },
    userPhotoUpdate(state, action: PayloadAction<string>) {
      if (state.account) {
        state.account.photo_url = action.payload ? action.payload : '';
      }
    },
  },
});

export const { accountInitialize, accountLoader, userPhotoUpdate, updateAccount } = slice.actions;

export default slice.reducer;
