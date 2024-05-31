import {configureStore} from "@reduxjs/toolkit"
import authReducer from './slice/authSlice.js'; 
import {apiSlice} from "./slice/apiSlice.js"

const Store = configureStore({
    reducer:{
        auth:authReducer,
        [apiSlice.reducerPath]:apiSlice.reducer
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true,
        
    
})

export default Store