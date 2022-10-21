import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggelModel } from '../features/Modal/modalSlice'
import {moveRight,moveLeft} from '../utils/sliderModale'

function Notification({ productsNeedQnt }) {
  const dispatch = useDispatch(toggelModel)
  const [changePosition,setChangePosition]=useState(1)


  return (
    <div className=" mx-auto my-3.5 truncate w-[90%] ">
      <div className='flex justify-center'>
        <h1 className='uppercase text-red-700 text-lg font-bold'>{productsNeedQnt.length} Produit </h1>
      </div>

        <div

        onClick={()=>moveRight(productsNeedQnt,setChangePosition,changePosition)}
         className='absolute inset-y-1/2 cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>

        </div>
        <div
        onClick={()=>moveLeft(productsNeedQnt,setChangePosition,changePosition)}
         className='absolute inset-y-1/2 right-0 cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>

      <div  className={`flex 
                         relative left-[-${changePosition * 100}%] max-w-[200px]  mx-3`}  >


        {
          productsNeedQnt.map(prod => {
            return (
              <div key={prod.id} className='w-full m-4 transition ease-in-out delay-150'  >
                <div className='flex m-2'>

                  <label className=" uppercase  text-gray-700 text-xs font-bold " >
                    Nom Produit:
                  </label>
                  <h1 className='ml-2 text-xs  font-bold'>{prod.nomProduct}</h1>
                </div>
                <div className='flex m-2 '>
                  <label className=" uppercase text-gray-700 text-xs font-bold ">
                    referance:
                  </label >
                  <h1 className='ml-2 text-xs  font-bold'>{prod.referance}</h1>
                </div>
                <div className='flex m-2'>
                  <label className="uppercase text-gray-700 text-xs font-bold" >
                    Qnt Produit:
                  </label>
                  <h2 className='ml-2 text-xs  font-bold'>{prod.Qnt}</h2>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className='flex justify-center'>
        <button
          onClick={() => dispatch(toggelModel({ id: null, type: "" }))}
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">fermme</button>
      </div>

    </div>
  )
}

export default Notification