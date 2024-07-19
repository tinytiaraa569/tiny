import { createReducer } from "@reduxjs/toolkit";

const initialState ={
    isLoading:true
}

export const orderReducer = createReducer(initialState,(builder)=>{
    // get all orders of user
    builder.addCase('getAllOrderUserRequest', (state, action) => {
        state.isLoading = true;
       
    })
    .addCase('getAllOrderUserSuccess', (state, action) => {
        state.isLoading = false;
        state.orders = action.payload

       
    })
    .addCase('getAllOrderUserFailed', (state, action) => {
        state.isLoading = false;
        state.error = action.payload;

       
    })

    // get all orders of shop

    .addCase('getAllOrderShopRequest', (state, action) => {
        state.isLoading = true;
       
    })
    .addCase('getAllOrderShopSuccess', (state, action) => {
        state.isLoading = false;
        state.orders = action.payload

       
    })
    .addCase('getAllOrderShopFailed', (state, action) => {
        state.isLoading = false;
        state.error = action.payload;

       
    })



   



    .addCase('clearErrors', (state) => {
        state.error = null;
    });
})
