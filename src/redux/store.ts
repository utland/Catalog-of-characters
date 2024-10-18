import { configureStore } from "@reduxjs/toolkit";
import characters from "./slices/charactersSlide"
import filter from "./slices/filterSlice";

const store = configureStore({
    reducer: {
        characters,
        filter
    }
})

export default store;