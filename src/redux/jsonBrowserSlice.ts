import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from './store'

// Define a type for the slice state
interface JsonBrowserState {
    disabled: boolean
}

// Define the initial state using that type
const initialState: JsonBrowserState = {
    disabled: false,
}

export const jsonBrowserSlice = createSlice({
    name: 'jsonBrowser',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        enableJsonBrowser: (state) => {
            state.disabled = false;
        },
        disableJsonBrowser: (state) => {
            state.disabled = true;
        },
    },
})

export const { enableJsonBrowser, disableJsonBrowser } = jsonBrowserSlice.actions

export const selectJsonBrowserDisabled = (state: RootState) => state.jsonBrowser.disabled;

export default jsonBrowserSlice.reducer
