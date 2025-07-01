import { DestinyFormValues } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  destinyForm: DestinyFormValues | null;
}

const initialState: AuthState = {
  destinyForm: null,
};

const slice = createSlice({
  initialState: initialState,
  name: 'auth',
  reducers: {
    destinyFormInit: (state, action: PayloadAction<DestinyFormValues>) => {
      state.destinyForm = action.payload;
    },
  },
});

export const { destinyFormInit } = slice.actions;

export default slice.reducer;
