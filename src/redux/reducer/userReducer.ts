import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: `User${uuidv4().slice(0, 8)}`
    },
    reducers: {
        changeUsername: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { changeUsername } = userSlice.actions;
export const userReducer = userSlice.reducer;

