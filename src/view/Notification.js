import React from 'react'
import { useDispatch } from 'react-redux'
import { toggelModel } from '../features/Modal/modalSlice'

function Notification({ productsNeedQnt }) {
  const dispatch = useDispatch(toggelModel)

  return (
    <div className=" mx-auto my-3.5 w-[80%] ">
      <div className="flex justify-between mx-3 mb-6">

        {
          productsNeedQnt.map(prod => {
            return (
              <div key={prod.id} className='m-4' >
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
        <div  className='flex justify-center'>
          <button
            onClick={() => dispatch(toggelModel({ id: null, type: "" }))}
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">fermme</button>
        </div>

    </div>
  )
}

export default Notification