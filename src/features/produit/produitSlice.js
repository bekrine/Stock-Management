import {createSlice, nanoid,createAsyncThunk} from '@reduxjs/toolkit'
import {addDoc, 
    collection,
    deleteDoc,
    getDocs,
    doc,
     setDoc, 
     onSnapshot, 
     limit, 
     query, 
      orderBy,
       startAt,
        endAt,
        updateDoc
        } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { db } from '../../model/firebase'
import { checkQntProduct } from '../../utils/checkQntProduct'



const initialState={
    prds:[],
    productneedQnt:[],
    productRechrcher:null,
    status:'idle',
    error:null

}

// export const fetchProducts=createAsyncThunk('/fetchproduct',async()=>{
//     try {
        
    

//          onSnapshot(collection(db,'products'),(snapshot)=>{
//       const list=snapshot.docs.map(document=>{ 
//          return  {id:document.id,...document.data()}
//         })
//           let productQntDawn=checkQntProduct(list)
//           return {list,productQntDawn}
//       })
//     } catch (error) {
//         return error.message
//     }
// })
export const fetchProducts=createAsyncThunk('/fetchproduct',async()=>{

    const q=query(collection(db,'products'),limit(5))
    try {
        let list=[]
        const respance= await getDocs(q)
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
        toast.success('Produit Ajouter avec succe')

        } catch (error) {
            toast.error('Produit na pas Ajouter ')
            return error.message
        }
})

export const dProduct=createAsyncThunk('/deleteproduct',async(id)=>{
    try {
        await deleteDoc(doc(db,'products',id))
        toast.success('le Produit supprimer avec succes')
        
    } catch (error) {
        toast.error('error de suppression')
        return error.message

    }
})


export const updateProductField=createAsyncThunk('/updateProductField',async(prod)=>{

    try {
        const {referance,nomProduct,prix,Qnt,id}=prod
        await setDoc(doc(db,'products',id),{
                referance,
                nomProduct,
                prix,
                Qnt
        })
        toast.success('Produit Modifier avec succes')


    } catch (error) {
        toast.error('error de modification ')
        return error.message
    }


})


export const venteProducts=createAsyncThunk('/venteProduct',async(prodVente)=>{
    
    const {QntProd,QntVente,id}=prodVente
    try {
    if(QntProd<QntVente) throw 'quantité de vente est plus grande que produit on stock '
  
    let newQnt=QntProd - QntVente

        await updateDoc(doc(db,'products',id),{
                Qnt:newQnt
        })
        toast.success('quantité à ete mis à jour avec succes')

    } catch (error) {
        toast.error('error lorsque de mis à jour')
        return error
    }

    
})

export const RecherchProduct=createAsyncThunk('/recherch',async(item)=>{
    try {
        let Serch=[]
    
    const q=query(collection(db,'products'),orderBy('referance'),startAt(item),endAt(item+'\uf8ff')) 
    const querySnapshot= await getDocs(q)
        querySnapshot.forEach((doc) => {
      Serch.push(  {id:doc.id,...doc.data()})
       });
              return Serch
            } catch (error) {
                return error.message
            }
})

export const productSlice=createSlice({
    name:'products',
    initialState,
    reducers:{
        resetRecherche:(state)=>{
            state.productRechrcher=null
        }
    }
    ,
    extraReducers(builder){
        builder
        .addCase(fetchProducts.pending,(state,action)=>{
            state.status='loading'
        })
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            state.status='succeeded'
            state.productneedQnt=action.payload?.productQntDawn
            state.prds=action.payload?.list
        })
        .addCase(fetchProducts.rejected,(state,action)=>{
            state.status='failed'
            state.error=action.error.message
        })
        .addCase(addNewProduct.pending,(state,action)=>{
            state.status='addOnProgrese'
        
        })
        .addCase(addNewProduct.fulfilled,(state)=>{
            state.status='succeeded'
        })
        .addCase(dProduct.pending,(state,action)=>{
            state.status='loading'
        })
        .addCase(dProduct.fulfilled,(state,action)=>{
            state.status='succeeded'
        })
        .addCase(updateProductField.pending,(state,action)=>{
            state.status='updateOnProgres'
        })
        .addCase(updateProductField.fulfilled,(state,action)=>{
            state.status='succeeded'
        })
        .addCase(venteProducts.pending,(state)=>{
            state.status='venteOnProgres'
        })
        .addCase(venteProducts.fulfilled,(state,action)=>{
            state.error=action.payload
            state.status='succeeded'
        })     
        .addCase(RecherchProduct.fulfilled,(state,action)=>{{
            state.productRechrcher=action.payload
        }})
      
    }
})
export const SelectAllProducts=(state)=>state.product.prds 
export const SelectProductsNeedQnt=(state)=>state.product.productneedQnt 
export const SelectProductsRechercher=(state)=>state.product.productRechrcher
export const SelectProductsStatus=(state)=>state.product.status 
export const SelectProductsErrors=(state)=>state.product.error




export const {resetRecherche}=productSlice.actions

export default productSlice.reducer