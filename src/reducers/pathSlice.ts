import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store/store';

type PathNodes = Array<string | number>;

interface PathState {
  nodes: PathNodes;
  jsonPath: string;
  submitted: boolean;
}

export const initialState: PathState = {
  nodes: [],
  jsonPath: '$.',
  submitted: false,
};

export const fromNodesToJsonPath = (nodes: PathNodes): string => {
  return (
    '$.' +
    nodes.map((n) => ((n as string).includes('.') ? `[${n}]` : n)).join('.')
  );
};

export const pathSlice = createSlice({
  name: 'path',
  initialState,
  reducers: {
    updateNodes: (state, action: PayloadAction<PathNodes>) => {
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

// actions
export const { updateNodes, submitPath, deferPath, resetPath } =
  pathSlice.actions;

// selectors
export const selectJsonPath = (state: RootState): string => state.path.jsonPath;
export const selectNodes = (state: RootState): PathNodes => state.path.nodes;
export const selectSubmitted = (state: RootState): boolean =>
  state.path.submitted;

// reducer
export default pathSlice.reducer;
