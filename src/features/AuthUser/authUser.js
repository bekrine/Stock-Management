import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import { sendPasswordResetEmail, signOut } from "firebase/auth";
import { auth } from "../../model/firebase";


export const forgetPassword=createAsyncThunk('/forgetPassword',async(email)=>{

        try {
            await sendPasswordResetEmail(auth,email)

        } catch (error) {
            return error.message
        }
})


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
    },
    extraReducers(builder){
        builder
        .addCase(forgetPassword.fulfilled,(state,action)=>{
            console.log(action)
        })
        

    }

})

export const AuthState=(state)=>state.auth.currentUser

export const {logOut,login}=AthSlice.actions

export default AthSlice.reducer