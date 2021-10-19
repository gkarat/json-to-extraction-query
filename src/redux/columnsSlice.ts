import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from './store';

// Define a type for the slice state
interface ColumnsState {
  value: string;
  submitted: boolean;
}

// Define the initial state using that type
const initialState: ColumnsState = {
  value: '',
  submitted: false,
};

export const columnsSlice = createSlice({
  name: 'columns',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateColumns: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    submitColumns: (state) => {
      state.submitted = true;
    },
    deferColumns: (state) => {
      state.submitted = false;
    },
  },
});

export const { updateColumns, submitColumns, deferColumns } =
  columnsSlice.actions;
export const selectColumnsValue = (state: RootState) => state.columns.value;
export const selectColumnsSubmitted = (state: RootState) =>
  state.columns.submitted;
export default columnsSlice.reducer;
