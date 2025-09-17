import { DestinyFormValues, FateQuoteResult } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  destinyForm: DestinyFormValues | null;
  fateQuoteResult: FateQuoteResult | null;
  fateQuoteError: string | null;
}

const initialState: AppState = {
  destinyForm: null,
  fateQuoteResult: null,
  fateQuoteError: null,
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
    setFateQuoteError: (state, action: PayloadAction<string | null>) => {
      state.fateQuoteError = action.payload;
    },
  },
});

export const { destinyFormInit, setFateQuoteResult, setFateQuoteError } = slice.actions;

export default slice.reducer;
