import React,{useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { SelectAllProducts,deleteProduct } from '../features/produit/produitSlice'
import{modalState, toggelModel} from '../features/Modal/modalSlice'

import Recherch from './Recherch'
import Modal from './Modal'
import UpdateProduct from './UpdateProduct'
import Vente from './Vente'
import Notification from './Notification'

function Table() {
    const dispatch=useDispatch()
    const products = useSelector(SelectAllProducts)
    const modalType = useSelector(modalState)
    const reverseProdact = [...products].reverse()
  const [searchTerm,setSeachTerm]=useState('')



    const Delete=(id)=>{
        if(window.confirm('vous les vous vraiment supprimer ce produit ?')){
            dispatch(deleteProduct(id))
        }
    }




    const Allprods= reverseProdact.filter(prod=>{
        if(searchTerm === ""){
            return prod
        }else if(prod.referance.toLowerCase().includes(searchTerm.toLowerCase())){
            return prod
        }
    }).map((product) => {
        return (
            <tr key={product.id} className="bg-white dark:bg-gray-800">
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
    })


    return (
        <>
            <Recherch setSeachTerm={setSeachTerm} />
            <div className="overflow-x-auto relative">
                <table className="mx-auto my-2 w-[80%] text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                        <th scope="col" className="py-3 px-6 ">
                                Référence
                            </th>
                            <th scope="col" className="py-3 px-6 ">
                                Nom Produit
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Quantité
                            </th>
                            <th scope="col" className="py-3 px-6 ">
                                Prix
                            </th>
                            <th scope="col" className="py-3 px-6 ">
                                Control
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           Allprods
                        }

                    </tbody>
                </table>
            </div>
            <Modal>
                {
                    modalType?.type ==='update'? <UpdateProduct/>: modalType?.type ==='vente' ? <Vente/> : <Notification/>
                  
                }
                
            </Modal>
        </>
    )
}

export default Table