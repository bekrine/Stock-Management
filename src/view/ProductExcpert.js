import React from 'react'
import { useDispatch } from 'react-redux'
import{toggelModel} from '../features/Modal/modalSlice'
import {dProduct } from '../features/produit/produitSlice'


function ProductExcpert({product}) {

    const dispatch=useDispatch()
    const Delete=(id)=>{
        if(window.confirm('vous les vous vraiment supprimer ce produit ?')){
            dispatch(dProduct(id))
        }
    }

  return (
    <tr  className="bg-white dark:bg-gray-800">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {product.referance}
                </th>
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {product.nomProduct}
                </th>
                <td className="py-4 px-6">
                    {product.Qnt}
                </td>
                <td className="py-4 px-6">
                    {product.prix} DH
                </td>
                <td className="py-4 px-6">
                    <button 
                    onClick={()=>dispatch(toggelModel({id:product.id,type:"update"}))}
                    type="button" 
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">modifier</button>
                    <button 
                    onClick={()=>Delete(product.id)}
                    type="button" 
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">supprimer</button>
                    <button 
                    onClick={()=>dispatch(toggelModel({id:product.id,type:'vente'}))}
                    type="button" 
                    className="focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-500 font-medium rounded-lg text-sm px-2 py-2.5 mr-2 mb-2 dark:bg-blue-500 dark:hover:bg-blue-500 dark:focus:ring-bleu-600">vente</button>
                </td>
            </tr>
  )
}

export default ProductExcpert