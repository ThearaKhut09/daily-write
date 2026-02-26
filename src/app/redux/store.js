import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./feature/counter/counterSlice";

//set up store
export const store = configureStore({
   // Add a reducer
    reducer:{
        counter: counterSlice.reducer
    }
})