import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AlertColor } from '@mui/material'

// Define the initial state using that type
type initialStateType = {
    props: {
        severity?: AlertColor,
        message: string
    }
}

const initialState: initialStateType = {
    props: {
        message: ""
    }
}


export const toastSlice = createSlice({
    name: 'toast',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        openToast: (state, action: PayloadAction<initialStateType>) => {
            state.props = {
                severity: action.payload.props.severity,
                message: action.payload.props.message
            }

        },
    },
})

export const { openToast } = toastSlice.actions

// // Other code such as selectors can use the imported `RootState` type
// export const getMogetModede = (state: RootState) => state.counter.value

export default toastSlice.reducer