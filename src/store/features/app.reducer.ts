import { DestinyFormValues, FateQuoteResult } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  destinyForm: DestinyFormValues | null;
  fateQuoteResult: FateQuoteResult | null;
}

const initialState: AuthState = {
  destinyForm: null,
  fateQuoteResult: null,
};

const slice = createSlice({
  initialState: initialState,
  name: 'auth',
  reducers: {
    destinyFormInit: (state, action: PayloadAction<DestinyFormValues | null>) => {
      state.destinyForm = action.payload;
    },
    setFateQuoteResult: (state, action: PayloadAction<FateQuoteResult | null>) => {
      state.fateQuoteResult = action.payload;
    },
  },
});

export const { destinyFormInit, setFateQuoteResult } = slice.actions;

export default slice.reducer;
