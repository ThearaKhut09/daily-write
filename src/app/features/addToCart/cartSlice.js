import { createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
    name: "cart",
    initialState: {
        cart: []
    },
    reducers:{
        addToCart : (state , action) => {
            state.cart.push(action.payload);
        },
        remove: (state, action) => {
            state.cart.pop(action.payload);
        },
        increaseMoney: (state, action) => {
            state.cart += action.payload;
        }
        
    }
})

export default cart.reducer;
export const {addToCart , remove, increaseMoney} = cart.actions;