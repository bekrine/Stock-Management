import React,{useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { SelectAllProducts,
    SelectProductsStatus,
    SelectProductsErrors, 
    SelectProductsNeedQnt, 
    SelectProductsRechercher } from '../features/produit/produitSlice'
import{modalState, toggelModel} from '../features/Modal/modalSlice'

import ProductExcpert from './ProductExcpert'
import Recherch from './Recherch'
import Modal from './Modal'
import UpdateProduct from './UpdateProduct'
import Vente from './Vente'
import Notification from './Notification'
import Loader from './Loader'
import { ToastContainer } from 'react-toastify'

function Table() {
    const dispatch=useDispatch()
    const products = useSelector(SelectAllProducts)
    const productsNeedQnt = useSelector(SelectProductsNeedQnt)
    const Status = useSelector(SelectProductsStatus)
    const error = useSelector(SelectProductsErrors)
    const modalType = useSelector(modalState)
    const productRechrcher = useSelector(SelectProductsRechercher)
    


    useEffect(()=>{
        if(productsNeedQnt?.length > 0){
            dispatch(toggelModel({id:null,type:'notification'}))   
        }
    },[productsNeedQnt?.length,dispatch])
    
    let content
    if(Status === 'loading'){
        return <Loader/>
    }else if(Status =='rechercheOnProgres'){
        if(productRechrcher?.length === 0){
            content=<tr><td>Aucun produit Trouve</td></tr>
    }else
        content=productRechrcher?.map((product) => {
            return <ProductExcpert product={product} key={product.id} /> } )            

    }else  if(Status === 'succeeded'){
         content=products?.map((product) => {
            return <ProductExcpert product={product} key={product.id} />  
        })  
    }else if(Status === 'failed'){
        return <div>{error}</div>
    }
    


    return (
        <>
            <Recherch  />
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
            <ToastContainer autoClose={2000}/>
        
        </>
    )
}

export default Table