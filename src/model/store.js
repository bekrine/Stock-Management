import {configureStore} from '@reduxjs/toolkit'
import productReducer from '../features/produit/produitSlice'
import modalReducer from '../features/Modal/modalSlice'
import AuthReducer from '../features/AuthUser/authUser'

export default configureStore({
    reducer:{
         product:productReducer,
         modal:modalReducer,
         auth:AuthReducer,


    }
})