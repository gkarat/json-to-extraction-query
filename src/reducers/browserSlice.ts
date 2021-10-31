import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store/store';

export type JsonData =
  | Array<unknown>
  | Record<string, unknown>
  | string
  | number
  | boolean
  | null;

interface BrowserState {
  disabled: boolean;
  initJson: JsonData;
  currentJson: JsonData;
}

export const initialState: BrowserState = {
  disabled: false,
  initJson: null,
  currentJson: null,
};

export const browserSlice = createSlice({
  name: 'browser',
  initialState,
  reducers: {
    enableBrowser: (state) => {
      state.disabled = false;
    },
    disableBrowser: (state) => {
      state.disabled = true;
    },
    updateJson: (state, action: PayloadAction<JsonData>) => {
      state.currentJson = action.payload;
    },
    resetJson: (state) => {
      state.currentJson = state.initJson;
    },
    initJson: (state, action: PayloadAction<JsonData>) => {
      state.initJson = action.payload;
      state.currentJson = action.payload;
    },
  },
});

// actions
export const {
  enableBrowser,
  disableBrowser,
  updateJson,
  resetJson,
  initJson,
} = browserSlice.actions;

// selectors
export const selectJson = (state: RootState): JsonData =>
  state.browser.currentJson;
export const selectDisabled = (state: RootState): boolean =>
  state.browser.disabled;

// reducer
export default browserSlice.reducer;
