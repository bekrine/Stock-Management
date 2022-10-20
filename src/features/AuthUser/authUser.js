import { createSlice } from "@reduxjs/toolkit";
import { signOut } from "firebase/auth";
import { auth } from "../../model/firebase";




export const AthSlice=createSlice({
    name:'authSlice',
    initialState:{
        currentUser:null
    },
    reducers:{
        login(state,action){
            state.currentUser=action.payload
        },
        logOut:async (state)=>{
            try {
                 await signOut(auth)
                
            } catch (error) {
                return error.message
            }
        

        }
    }

})

export const AuthState=(state)=>state.auth.currentUser

export const {logOut,login}=AthSlice.actions

export default AthSlice.reducer