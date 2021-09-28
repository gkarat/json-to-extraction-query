import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from './store'

// Define a type for the slice state
interface PathSelectionState {
    value: string,
    submitted: boolean
}

// Define the initial state using that type
const initialState: PathSelectionState = {
    value: '',
    submitted: false,
}

export const pathSelectionSlice = createSlice({
    name: 'pathSelection',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        updatePathSelection: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        },
        submitPathSelection: (state) => {
            state.submitted = true;
        },
        deferPathSelection: (state) => {
            state.submitted = false;
        }
    },
})

export const { updatePathSelection, submitPathSelection, deferPathSelection } = pathSelectionSlice.actions
export const selectPathSelectionValue = (state: RootState) => state.pathSelection.value;
export const selectPathSelectionSubmitted = (state: RootState) => state.pathSelection.submitted;
export default pathSelectionSlice.reducer
