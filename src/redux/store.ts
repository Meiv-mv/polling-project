import { configureStore } from "@reduxjs/toolkit";
import { boxReducer } from "./reducer/boxReducer";
import { userReducer } from "./reducer/userReducer";

const store = configureStore({
    reducer: {
        box: boxReducer,
        user: userReducer
    }
})

export default store;