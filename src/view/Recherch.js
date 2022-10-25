import React,{useRef} from 'react'
import { Link } from 'react-router-dom'
import {RecherchProduct,resetRecherche} from '../features/produit/produitSlice'
import {useDispatch} from 'react-redux'

function Recherch() {

const dispatch=useDispatch()
const searchTerm=useRef()


const Serch=()=>{
  if(searchTerm.current.value.length === 2 )
  {
    dispatch(resetRecherche())
  }else
  if(searchTerm.current.value.length >2){
     dispatch( RecherchProduct(searchTerm.current.value))
  }
}

  return (
      <div className='  mx-auto my-2  md:flex w-[80%] justify-around mt-14 '>

<div className="relative mb-2  ">
        <div className="flex absolute  inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
        </div>
        <input 
                onChange={()=>Serch()}
                type="text" 
                id="search-navbar"
                ref={searchTerm}
                className=" block p-2 pl-10 w-full  text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " 
                placeholder="Search..."/>
      </div>
      <div className="flex  bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"  >

      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
      <Link to={'/Addproduct'}
                    >
        Ajouter produite 
        
      </Link>

                      </div>
      </div>
  )
}

export default Recherch