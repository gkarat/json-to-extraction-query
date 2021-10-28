import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store/store';

type ColumnPaths = Array<string>;

interface ColumnsState {
  paths: ColumnPaths;
  submitted: boolean;
}

export const initialState: ColumnsState = {
  paths: [],
  submitted: false,
};

export const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    updateColumns: (state, action: PayloadAction<ColumnPaths>) => {
      state.paths = action.payload;
    },
    submitColumns: (state) => {
      state.submitted = true;
    },
    deferColumns: (state) => {
      state.submitted = false;
    },
    resetColumns: (state) => {
      Object.assign(state, initialState);
    },
  },
});

// actions
export const { updateColumns, submitColumns, deferColumns, resetColumns } =
  columnsSlice.actions;

// selectors
export const selectColumnsPaths = (state: RootState): ColumnPaths =>
  state.columns.paths;
export const selectColumnsSubmitted = (state: RootState): boolean =>
  state.columns.submitted;

// reducer
export default columnsSlice.reducer;
