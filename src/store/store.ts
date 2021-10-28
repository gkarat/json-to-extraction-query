import { configureStore } from '@reduxjs/toolkit';

import browserReducer from '../reducers/browserSlice';
import pathReducer from '../reducers/pathSlice';
import columnsReducer from '../reducers/columnsSlice';

const store = configureStore({
  reducer: {
    browser: browserReducer,
    path: pathReducer,
    columns: columnsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
