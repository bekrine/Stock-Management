import {createSlice, nanoid,current} from '@reduxjs/toolkit'


export const productSlice=createSlice({
    name:'products',
    initialState:
            {
                prds:[{
        id:2,
        referance:"398HH8",
        nomProduct:'join',
        prix:122,
        Qnt:22,

    },
    {
        id:3,
        referance:"398sqH8",
        nomProduct:'left',
        prix:324,
        Qnt:223,

    }]
    },
    reducers:{
        addProduct:{
           reducer(state,action){
             state.prds.push(action.payload)
        },prepare(value){
            return{
             payload:{id:nanoid(),...value}
            } 
        }
    },
        updateProduct:(state,action)=>{
            const productUpdated=state.prds.filter(prod=>prod.id === action.payload.id)
            productUpdated[0].referance=action.payload.referance
            productUpdated[0].nomProduct=action.payload.nomProduct
            productUpdated[0].prix=action.payload.prix
            productUpdated[0].Qnt=action.payload.Qnt 
        },
        deleteProduct(state,action){
             state.prds=state.prds.filter(prod=>prod.id !== action.payload)
        }
    }
})
export const SelectAllProducts=(state)=>state.product.prds 


export const {addProduct,updateProduct,deleteProduct}=productSlice.actions

export default productSlice.reducer