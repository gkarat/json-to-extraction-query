import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from './store';

// Define a type for the slice state
interface BrowserState {
  disabled: boolean;
}

// Define the initial state using that type
const initialState: BrowserState = {
  disabled: false,
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
  },
});

export const { enableBrowser, disableBrowser } = browserSlice.actions;

export const selectBrowserDisabled = (state: RootState) =>
  state.browser.disabled;

export default browserSlice.reducer;
