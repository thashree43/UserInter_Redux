import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    adminInfo: localStorage.getItem("adminInfo") ? JSON.parse(localStorage.getItem("adminInfo")) : null,
    selectedUser: localStorage.getItem("selectedUser") ? JSON.parse(localStorage.getItem("selectedUser")) : null // Add selectedUser to the initial state
};

const adminSlice = createSlice({
    name:"admin",
    initialState,
    reducers:{
        setadminlogin:(state,action)=>{
            state.adminInfo = action.payload;
            localStorage.setItem("adminInfo", JSON.stringify(action.payload));
        },
        adminlogout:(state)=>{
            state.adminInfo = null;
            localStorage.removeItem("adminInfo");
        },
        setSelectedUser: (state, action) => {
            console.log("action",action);
            state.selectedUser = action.payload;
            localStorage.setItem('selectedUser',JSON.stringify(action.payload))
        },
    }
});


export const { setadminlogin, adminlogout, setSelectedUser } = adminSlice.actions;
export default adminSlice.reducer;
