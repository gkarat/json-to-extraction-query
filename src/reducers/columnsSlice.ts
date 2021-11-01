import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store/store';

type ColumnPath = string;
type ColumnName = string;

export type Column = {
  path: ColumnPath;
  name: ColumnName;
};

interface ColumnsState {
  columns: Column[];
  previewed: boolean;
  open: boolean;
}

export const initialState: ColumnsState = {
  columns: [],
  previewed: false,
  open: false,
};

export const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    updateColumns: (state, action: PayloadAction<Column[]>) => {
      state.columns = action.payload;
    },
    updatePreviewed: (state, action: PayloadAction<boolean>) => {
      state.previewed = action.payload;
    },
    resetColumns: (state) => {
      Object.assign(state, initialState);
    },
    toggleOpen: (state) => {
      state.open = !state.open;
    },
  },
});

// actions
export const { updateColumns, updatePreviewed, resetColumns, toggleOpen } =
  columnsSlice.actions;

// selectors
export const selectColumns = (state: RootState): Column[] =>
  state.columns.columns;
export const selectNames = (state: RootState): ColumnName[] =>
  state.columns.columns.map((c) => c.name);
export const selectPaths = (state: RootState): ColumnPath[] =>
  state.columns.columns.map((c) => c.path);
export const selectPreviewed = (state: RootState): boolean =>
  state.columns.previewed;
export const selectOpen = (state: RootState): boolean => state.columns.open;

// reducer
export default columnsSlice.reducer;
