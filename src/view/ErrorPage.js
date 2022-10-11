import React from 'react'
import {useRouteError} from 'react-router-dom'

function ErrorPage() {
    const error=useRouteError()

  return (
    <div className='w-[80%]  mx-auto my-14 flex justify-center items-center '>
        <div className='flex flex-col items-center'>

    <h1 className='text-5xl m-4'>Oops!</h1>
    <p>Sorry, an unexpected error has occurred.</p>
    <p className='m-4'>
       <i>{error.statusText || error.message}</i> 
    </p>
        </div>
  </div>
  )
}

export default ErrorPage