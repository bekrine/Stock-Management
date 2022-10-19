import {createSlice, nanoid,createAsyncThunk} from '@reduxjs/toolkit'
import {addDoc, collection,deleteDoc,getDocs,doc, setDoc} from 'firebase/firestore'
import { db } from '../../model/firebase'
import { checkQntProduct } from '../../utils/checkQntProduct'



const initialState={
    prds:[],
    productneedQnt:[],
    status:'idle',
    error:null

}

export const fetchProducts=createAsyncThunk('/fetchproduct',async()=>{
    try {
        let list=[]
        const respance= await getDocs(collection(db,'products'))
        respance.forEach((doc) => {
            list.push({id:doc.id,...doc.data()})
        });
       let productQntDawn=checkQntProduct(list)
        return {list,productQntDawn}
        
    } catch (error) {
        return error.message
    }
})

export const addNewProduct=createAsyncThunk('/addProduct',async({referance,nomProduct,prix,Qnt})=>{
        try {
             await addDoc(collection(db,'products'),{
                referance,
                nomProduct,
                prix,
                Qnt
            })
        } catch (error) {
            return error.message
        }
})

export const dProduct=createAsyncThunk('/deleteproduct',async(id)=>{
    try {
        await deleteDoc(doc(db,'products',id))
        
    } catch (error) {
        return error.message
    }
})


export const updateProductField=createAsyncThunk('/updateProductField',async(prod)=>{

    console.log(prod)
    try {
        const {referance,nomProduct,prix,Qnt,id}=prod
        await setDoc(doc(db,'products',id),{
                referance,
                nomProduct,
                prix,
                Qnt
        })

    } catch (error) {
        return error.message
    }


})


export const venteProducts=createAsyncThunk('/venteProduct',async(prodVente)=>{
    
    const {prod,products}=prodVente
    const {referance,nomProduct,prix,Qnt,id}=prod
    
    const prd=products.filter(p=>p.id === id)
    let newQnt=prd[0].Qnt - Qnt

    try {
        await setDoc(doc(db,'products',id),{
                referance,
                nomProduct,
                prix,
                Qnt:newQnt
        })

    } catch (error) {
        return error.message
    }

    
})


export const productSlice=createSlice({
    name:'products',
    initialState,
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
        },
        vente(state,action){
            const prd=state.prds.filter(p=>p.id === action.payload.id)
            prd[0].Qnt=prd[0].Qnt - action.payload.Qnt
        }
    },
    extraReducers(builder){
        builder
        .addCase(fetchProducts.pending,(state,action)=>{
            state.status='loading'
        })
        .addCase(fetchProducts.fulfilled,(state,action)=>{

            state.status='succeeded'
            state.productneedQnt=action.payload.productQntDawn
            state.prds=action.payload.list
        })
        .addCase(fetchProducts.rejected,(state,action)=>{
            state.status='failed'
            state.error=action.error.message
        })
        .addCase(addNewProduct.fulfilled,(state,action)=>{
            state.status='idle'
        
        })
        .addCase(dProduct.fulfilled,(state,action)=>{
            state.status='idle'
        })
        .addCase(updateProductField.fulfilled,(state,action)=>{
            state.status='idle'
        })
        .addCase(venteProducts.fulfilled,(state)=>{
            state.status='idle'
        })
    }
})
export const SelectAllProducts=(state)=>state.product.prds 
export const SelectProductsNeedQnt=(state)=>state.product.productneedQnt 
export const SelectProductsStatus=(state)=>state.product.status 
export const SelectProductsErrors=(state)=>state.product.error




export const {addProduct,updateProduct,deleteProduct,venteProduct}=productSlice.actions

export default productSlice.reducer