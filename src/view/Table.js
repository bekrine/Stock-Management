import React,{useEffect, useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { SelectAllProducts,SelectProductsStatus,SelectProductsErrors,fetchProducts, SelectProductsNeedQnt } from '../features/produit/produitSlice'
import{modalState, toggelModel} from '../features/Modal/modalSlice'

import ProductExcpert from './ProductExcpert'
import Recherch from './Recherch'
import Modal from './Modal'
import UpdateProduct from './UpdateProduct'
import Vente from './Vente'
import Notification from './Notification'
import Loader from './Loader'

function Table() {
    const dispatch=useDispatch()
    const products = useSelector(SelectAllProducts)
    const productsNeedQnt = useSelector(SelectProductsNeedQnt)
    const Status = useSelector(SelectProductsStatus)
    const error = useSelector(SelectProductsErrors)
    const modalType = useSelector(modalState)
    



    useEffect(()=>{
        if(productsNeedQnt.length > 0){
            dispatch(toggelModel({id:null,type:'notification'}))   
        }
    },[productsNeedQnt.length])
    
    const [searchTerm,setSeachTerm]=useState('')
    
    
    
    
    

    let content
    if(Status === 'loading'){
        return <Loader/>
    }else if(Status === 'succeeded'){
        const reverseProdact = [...products].reverse()
       content=reverseProdact.filter(prod=>{
            if(searchTerm === ""){
                return prod
            }else if(prod.referance.toLowerCase().includes(searchTerm.toLowerCase())){
                return prod
            }
        }).map((product) => {
            return <ProductExcpert product={product} key={product.id} />  
        })
         
    }else if(Status === 'failed'){
        return <div>{error}</div>
    }
    
    


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
                           content
                        }

                    </tbody>
                </table>
            </div>
            <Modal>
                {
                    modalType?.type ==='update'? <UpdateProduct/>
                        : modalType?.type ==='vente' ? <Vente/>
                             : modalType?.type ==='notification' ?
                              <Notification productsNeedQnt={productsNeedQnt}/> 
                             : null
                  
                }
                
            </Modal>
        </>
    )
}

export default Table