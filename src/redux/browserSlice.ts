import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from './store';
import data from '../public/data.json';

// Define a type for the slice state
interface BrowserState {
  disabled: boolean;
  data: Record<string, unknown>;
}

// Define the initial state using that type
const initialState: BrowserState = {
  disabled: false,
  data,
};

export const browserSlice = createSlice({
  name: 'browser',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    enableBrowser: (state) => {
      state.disabled = false;
    },
    disableBrowser: (state) => {
      state.disabled = true;
    },
    updateData: (state, action: PayloadAction<Record<string, unknown>>) => {
      state.data = action.payload;
    },
    resetBrowser: (state) => {
      state.disabled = false;
      state.data = initialState.data;
    },
  },
});

export const { enableBrowser, disableBrowser, updateData, resetBrowser } =
  browserSlice.actions;

export const selectData = (state: RootState) => state.browser.data;
export const selectBrowserDisabled = (state: RootState) =>
  state.browser.disabled;

export default browserSlice.reducer;
