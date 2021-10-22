import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from './store';

// Define a type for the slice state
interface PathState {
  nodes: Array<string | number>;
  jsonPath: string;
  submitted: boolean;
}

// Define the initial state using that type
const initialState: PathState = {
  nodes: [],
  jsonPath: '$.',
  submitted: false,
};

export const fromNodesToJsonPath = (nodes: Array<string | number>) => {
  return (
    '$.' +
    nodes.map((n) => ((n as string).includes('.') ? `[${n}]` : n)).join('.')
  );
};

export const pathSlice = createSlice({
  name: 'path',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateNodes: (state, action: PayloadAction<Array<string | number>>) => {
      state.nodes = action.payload;
      state.jsonPath = fromNodesToJsonPath(action.payload);
    },
    submitPath: (state) => {
      state.submitted = true;
    },
    deferPath: (state) => {
      state.submitted = false;
    },
    resetPath: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { updateNodes, submitPath, deferPath, resetPath } =
  pathSlice.actions;
export const selectJsonPath = (state: RootState) => state.path.jsonPath;
export const selectNodes = (state: RootState) => state.path.nodes;
export const selectSubmitted = (state: RootState) => state.path.submitted;
export default pathSlice.reducer;
