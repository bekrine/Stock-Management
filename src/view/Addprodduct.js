import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { addNewProduct, SelectProductsStatus } from '../features/produit/produitSlice'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import { ToastContainer } from 'react-toastify'

function Addprodduct() {
  const dispatch=useDispatch()
  const Status=useSelector(SelectProductsStatus)

  const formik=useFormik({
  initialValues:{
    referance:'',
        nomProduct:'',
        prix:"",
        Qnt:''

      },validationSchema:Yup.object({
        referance:Yup.string().required("champs obligatoir remplire le champ s'il vous plait"),
        nomProduct:Yup.string().required("champs obligatoir remplire le champ s'il vous plait"),
        prix:Yup.number().positive('le prix ne peut pas etre negative').min(1).required("champs obligatoir remplire le champ s'il vous plait"),
        Qnt:Yup.number().positive('le prix ne peut pas etre negative').min(1).required("champs obligatoir remplire le champ s'il vous plait"),
      }),
      onSubmit:value=>{
        dispatch(addNewProduct(value))
       if( Status === 'succeeded') resetForm('')
        
      }
    })  

    const {handleSubmit,touched,errors,getFieldProps,resetForm}=formik


  return (
    <form onSubmit={handleSubmit} className=" mx-auto my-3.5 w-[80%] ">    
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
          Référence  
          </label>
          <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${errors.referance && touched.referance ? "border-red-500" :""}`} 
                 id="referance" type="text" placeholder="Référence"
                {...getFieldProps('referance')}
                 />
           {
                   touched.referance && errors.referance ?<p className="text-red-500 text-xs italic">{errors.referance}</p>:null
                 }
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
          Nom Produit
          </label>
          <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${errors.nomProduct && touched.nomProduct ? "border-red-500":""}`} 
                 id="nomProduct" type="text" placeholder="Nom Product"
                {...getFieldProps('nomProduct')}  
                 />
                 {
                   touched.nomProduct && errors.nomProduct ?<p className="text-red-500 text-xs italic">{errors.nomProduct}</p>:null
                 }
          
        </div>
      </div>
        <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
         Prix Produit 
          </label>
          <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${errors.prix && touched.prix ? "border-red-500" :""}`}
                    id="prix" type="number" placeholder=" Prix Produit  "
                {...getFieldProps('prix')}  
                    />
           {
                   touched.prix && errors.prix ?<p className="text-red-500 text-xs italic">{errors.prix}</p>:null
                 }
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
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        {  Status === 'addOnProgrese' ? 
              <div className=" z-[1000] spinner-border animate-spin w-8 h-8 border-4 rounded-full" role="status">
                <span className="visually-hidden"></span>
              </div>
             : 'Ajouter Produite'
            }
      </button>
     <ToastContainer/>            
    </form>  )
}

export default Addprodduct