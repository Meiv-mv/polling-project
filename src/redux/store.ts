import { configureStore} from "@reduxjs/toolkit";
import { boxReducer} from "./reducer/boxReducer";

const store = configureStore({
    reducer: {
        box: boxReducer
    }
})

export default store;