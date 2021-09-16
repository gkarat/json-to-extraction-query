import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from './store'

// Define a type for the slice state
interface PathSelectionState {
    value: string
}

// Define the initial state using that type
const initialState: PathSelectionState = {
    value: '',
}

export const pathSelectionSlice = createSlice({
    name: 'pathSelection',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        updatePathSelection: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        },
    },
})

export const { updatePathSelection } = pathSelectionSlice.actions

export const selectPathSelectionValue = (state: RootState) => state.pathSelection.value;

export default pathSelectionSlice.reducer
