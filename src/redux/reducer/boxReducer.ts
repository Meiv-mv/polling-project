import { createSlice } from '@reduxjs/toolkit'

const boxSlice = createSlice({
    name: "box",
    initialState: {
        value: 0
    },
    reducers: {
        changeBox: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { changeBox } = boxSlice.actions;
export const boxReducer = boxSlice.reducer;