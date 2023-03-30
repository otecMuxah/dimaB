import {configureStore} from "@reduxjs/toolkit";


export const store=configureStore({
    reducer:{
        user:userSlice
    },
    devTools:true
})