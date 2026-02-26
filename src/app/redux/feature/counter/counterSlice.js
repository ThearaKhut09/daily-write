import { createSlice } from "@reduxjs/toolkit";

//initial state
const initialState = {
    counter: 0
}

//Create Slice
export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers:{
        increment: (state) => {
            state.counter += 1;
        },
        decrement: (state) => {
            if(state.counter > 0){
                state.counter -= 1;
            }else{
                state.counter = 0;
                alert("Counter cannot be negative");
            }
        },
        incrementByAmount: (state, action) => {
            state.counter += action.payload;
        }
    }
})

//export every things
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;