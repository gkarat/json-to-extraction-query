import { configureStore } from '@reduxjs/toolkit'

import { jsonBrowserSlice } from './jsonBrowserSlice';
import { pathSelectionSlice } from './pathSelectionSlice';

const store = configureStore({
  reducer: {
    jsonBrowser: jsonBrowserSlice.reducer,
    pathSelection: pathSelectionSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;