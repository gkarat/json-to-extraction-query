import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from './store'

// Define a type for the slice state
interface ColumnSelectionState {
    value: string,
    submitted: boolean
}

// Define the initial state using that type
const initialState: ColumnSelectionState = {
    value: '',
    submitted: false,
}

export const columnSelectionSlice = createSlice({
    name: 'columnSelection',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        updateColumnSelection: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        },
        submitColumnSelection: (state) => {
            state.submitted = true;
        },
        deferColumnSelection: (state) => {
            state.submitted = false;
        }
    },
})

export const { updateColumnSelection, submitColumnSelection, deferColumnSelection } = columnSelectionSlice.actions
export const selectColumnSelectionValue = (state: RootState) => state.columnSelection.value;
export const selectColumnSelectionSubmitted = (state: RootState) => state.columnSelection.submitted;
export default columnSelectionSlice.reducer

