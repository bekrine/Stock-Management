import {createSlice} from '@reduxjs/toolkit'


export const modalSlice=createSlice({
    name:'modal',
    initialState:{
        isOpen:false,
        id:null,
        type:""
    },
    reducers:{
        toggelModel(state,action){
            state.isOpen=!state.isOpen
            state.id=action.payload.id || null
            state.type=action.payload.type
        },
        
    }
})

export const modalState=state=>state.modal

export const {toggelModel}=modalSlice.actions

export default modalSlice.reducer