import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { SelectAllProducts ,SelectProductsErrors,venteProducts } from '../features/produit/produitSlice'
import { toggelModel,modalState } from '../features/Modal/modalSlice'
import {useFormik} from 'formik'
import * as Yup from 'yup'

function Vente() {
   const dispatch=useDispatch()
  const products=useSelector(SelectAllProducts)
  const modal=useSelector(modalState)
  const errorState=useSelector(SelectProductsErrors)
  
  const disabled=true
   const prod=products.filter(prod=>prod.id === modal.id)
  

  const formik=useFormik({
    initialValues:{
      referance: prod[0].referance,
      nomProduct:prod[0].nomProduct ,
      prix:prod[0].prix ,
      Qnt: "" ,
      
    },validationSchema:Yup.object({
      Qnt:Yup.number().positive('le prix ne peut pas etre negative').min(1).required("champs obligatoir remplire le champ s'il vous plait"),
    }),
    onSubmit:value=>{
      const {Qnt}=value
      let prodVente={
        QntProd:prod[0].Qnt,
        QntVente:Qnt,
        id:modal.id
      }
   
     dispatch(venteProducts(prodVente))
    }
  })  
  const {handleSubmit,touched,errors,getFieldProps}=formik
  
  return (
    <>
    {errorState && <div className="flex justify-center m-4 text-red-500 text-md italic">{errorState}</div>}
    <form onSubmit={handleSubmit} className=" mx-auto my-3.5 w-[80%] ">    
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
          Référence  
          </label>
        
          <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${errors.referance && touched.referance ? "border-red-500" :""}`} 
                 id="referance" 
                 type="text" 
                 disabled={disabled}
                 placeholder="Référence"
                {...getFieldProps('referance')}/>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
          Nom Produit
          </label>
          <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${errors.nomProduct && touched.nomProduct ? "border-red-500":""}`} 
                 id="nomProduct"
                  type="text"
                 disabled={disabled}
                   placeholder="Nom Product"
                {...getFieldProps('nomProduct')}  
                 />
        </div>
      </div>
        <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
         Prix Produit 
          </label>
          <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${errors.prix && touched.prix ? "border-red-500" :""}`}
                 disabled={disabled}
                   id="prix"
                     type="number" 
                     placeholder=" Prix Produit  "
                {...getFieldProps('prix')}  
                    />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
          Quantité de Produite
          </label>
          <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${errors.Qnt && touched.Qnt ? "border-red-500" :""}`}
                id="Qnt" type="number" placeholder="Quantité de Produite"
                {...getFieldProps('Qnt')}  
                />
                 {
                   touched.Qnt && errors.Qnt ?<p className="text-red-500 text-xs italic">{errors.Qnt}</p>:null
                 }
        </div>
      </div>
      <div className='flex justify-between'>

      <button 
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
      type="submit">
        Vnete
      </button>
      <button 
      onClick={()=>dispatch(toggelModel({id:null,type:""}))}
      type="button" 
      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">fermme</button>
      </div>
    </form> 
    </>
     )
}

export default Vente