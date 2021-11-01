import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store/store';

export type PathNodes = Array<string | number>;

interface PathState {
  nodes: PathNodes;
  jsonPath: string;
  previewed: boolean;
  // stands for collapsing related accordion item
  open: boolean;
}

export const initialState: PathState = {
  nodes: [],
  jsonPath: '$.',
  previewed: false,
  open: true,
};

export const fromNodesToJsonPath = (nodes: PathNodes): string => {
  return (
    '$.' +
    nodes
      .map((n) => (typeof n === 'number' ? n : n.includes('.') ? `[${n}]` : n))
      .join('.')
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
    updatePreviewed: (state, action: PayloadAction<boolean>) => {
      state.previewed = action.payload;
    },
    resetPath: (state) => {
      Object.assign(state, initialState);
    },
    toggleOpen: (state) => {
      state.open = !state.open;
    },
  },
});

// actions
export const { updateNodes, updatePreviewed, resetPath, toggleOpen } =
  pathSlice.actions;

// selectors
export const selectJsonPath = (state: RootState): string => state.path.jsonPath;
export const selectNodes = (state: RootState): PathNodes => state.path.nodes;
export const selectPreviewed = (state: RootState): boolean =>
  state.path.previewed;
export const selectOpen = (state: RootState): boolean => state.path.open;

// reducer
export default pathSlice.reducer;
