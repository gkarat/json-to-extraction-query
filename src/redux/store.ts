import { configureStore } from '@reduxjs/toolkit';

import browserReducer from './browserSlice';
import pathReducer from './pathSlice';
import columnsRedicer from './columnsSlice';

const store = configureStore({
  reducer: {
    browser: browserReducer,
    path: pathReducer,
    columns: columnsRedicer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
