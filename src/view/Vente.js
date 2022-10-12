import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { SelectAllProducts } from '../features/produit/produitSlice'
import {useFormik} from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

function Vente() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const products=useSelector(SelectAllProducts)

    const formik=useFormik({
      initialValues:{
        referance:'',
        nomProduct:'',
        prix:"",
        Qnt:'',
        date:''

      },validationSchema:Yup.object({
        referance:Yup.string().required("champs obligatoir remplire le champ s'il vous plait"),
        nomProduct:Yup.string().required("champs obligatoir remplire le champ s'il vous plait"),
        prix:Yup.number().positive('le prix ne peut pas etre negative').min(1).required("champs obligatoir remplire le champ s'il vous plait"),
        Qnt:Yup.number().positive('le prix ne peut pas etre negative').min(1).required("champs obligatoir remplire le champ s'il vous plait"),
        date:Yup.date().required('choiser la date')
      }),
      onSubmit:value=>{
        // dispatch(addProduct(value))
        // navigate('/')
      }
    })  

    const {handleSubmit,touched,errors,getFieldProps}=formik


  return (
    <form onSubmit={handleSubmit} className=" mx-auto my-3.5 w-[80%] ">    
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
          Référence  
          </label>
        
      <div className="relative">
        <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
        {
          products.map(prod=>{
            return(
              <option key={prod.id}>{prod.referance}</option>
            )
          })
        }

        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    




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
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
          Date
          </label>
          <input className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${errors.Qnt && touched.Qnt ? "border-red-500" :""}`}
                id="date" type="date" placeholder="Quantité de Produite"
                {...getFieldProps('date')}  
                />
                 {
                   touched.date && errors.date ?<p className="text-red-500 text-xs italic">{errors.date}</p>:null
                 }
        </div>
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Vnete
      </button>

    </form>  )
}

export default Vente