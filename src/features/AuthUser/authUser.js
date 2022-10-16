import { createSlice } from "@reduxjs/toolkit";




export const AthSlice=createSlice({
    name:'authSlice',
    initialState:{
        currentUser:JSON.parse(localStorage.getItem('user')) || null
    },
    reducers:{
        login(state,action){
            state.currentUser=action.payload
            localStorage.setItem('user',JSON.stringify(state.currentUser))
        },
        logOut(state){
            state.currentUser=null
            localStorage.removeItem('user',JSON.stringify(state.currentUser))

        }
    }

})

export const AuthState=(state)=>state.auth

export const {logOut,login}=AthSlice.actions

export default AthSlice.reducer