import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { emptyUser, User } from "../../interfaces/user"

// Define the initial state using that type
type initialStateType = {
    user: User
}

const initialState: initialStateType = {
    user: emptyUser
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            return state
        },
    },
})

export const { setUser } = userSlice.actions

// // Other code such as selectors can use the imported `RootState` type
// export const getMogetModede = (state: RootState) => state.counter.value

export default userSlice.reducer