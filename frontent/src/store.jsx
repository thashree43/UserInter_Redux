import {configureStore} from "@reduxjs/toolkit"
import authReducer from './slice/authSlice.js'; 
import {apiSlice} from "./slice/apiSlice.js"
import adminReducer from './Adminslice/adminauthslice.js'

const Store = configureStore({
    reducer:{
        auth:authReducer,
        admin:adminReducer,
        [apiSlice.reducerPath]:apiSlice.reducer
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true,
        
    
})

export default Store