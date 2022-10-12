import {configureStore} from '@reduxjs/toolkit'
import productReducer from '../features/produit/produitSlice'
import modalReducer from '../features/Modal/modalSlice'

export default configureStore({
    reducer:{
         product:productReducer,
         modal:modalReducer
    }
})