// import { createSlice } from "@reduxjs/toolkit";
// import { json } from "express";

// const initialState = {
//     adminInfo:localStorage.getItem("adminInfo")?JSON.parse(localStorage.getItem("adminInfo")):null
// }

// const adminSlice = createSlice({
//     name:"admin",
//     initialState,
//     reducers:{
//         setadminlogin:(state,action)=>{
//             state.adminInfo =action.payload
//             localStorage.setItem("adminInfo",JSON.stringify(action.payload))
//         },
//         adminlogout:(state,action)=>{
//             state.adminInfo = null
//             localStorage.removeItem("adminInfo")
//         }
//     }
// })

// export const {setadminlogin,adminlogout} = adminSlice.actions;
// export default adminSlice.reducer