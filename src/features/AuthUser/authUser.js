import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import { sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../../model/firebase";



export const forgetPassword=createAsyncThunk('/forgetPassword',async(email)=>{

        try {
            await sendPasswordResetEmail(auth,email)

        } catch (error) {
            return error.message
        }
})


export const signIn=createAsyncThunk('/signIn',async(value)=>{

    const {email,password}=value
        try {
        const userCredential= await signInWithEmailAndPassword(auth,email,password)
        return <Navigate to={'/'} replace={true} />
             
        } catch (error) {
            return error.message
        }
})

export const signUserOut=createAsyncThunk('/signOut',async()=>{
        try {
             signOut(auth)
        } catch (error) {
            return error.message
        }
})


export const AthSlice=createSlice({
    name:'authSlice',
    initialState:{
        currentUser:null ||JSON.parse( localStorage.getItem('user')),
        status:"idel",
        error:null
    },
    reducers:{
        login(state,action){
            state.currentUser=action.payload
        },
        logOut(state){
            state.currentUser=null
           
        

        }
    },
    extraReducers(builder){
        builder
        .addCase(signIn.pending,(state,action)=>{
            state.status='loading'
        })
        .addCase(signIn.fulfilled,(state,action)=>{
           
            state.status='succeeded'
            // state.currentUser=action.payload
        })
        .addCase(signIn.rejected,(state,action)=>{
            state.status='failed'
            state.error=action.payload
        })
        .addCase(signUserOut.fulfilled,(state,action)=>{
            
        })
        .addCase(forgetPassword.fulfilled,(state,action)=>{
            console.log(action)
        })
        

    }

})

export const AuthState=(state)=>state.auth.currentUser
export const AuthStatus=(state)=>state.auth.status
export const AuthError=(state)=>state.auth.error

export const {logOut,login}=AthSlice.actions

export default AthSlice.reducer