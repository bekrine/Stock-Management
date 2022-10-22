import React from 'react'
import {useSelector} from 'react-redux'
import {modalState} from '../features/Modal/modalSlice'

function Modal({children}) {
    const isOpen=useSelector(modalState)
 if(!isOpen.isOpen) return null
  return (
      <>
      <div className='fixed inset-0 bg-slate-400 opacity-90 z-[1000]' />
    <div className=' fixed top-[50%] w-full  left-[50%] translate-y-[-50%] translate-x-[-50%] bg-white z-[1000] sm:w-fit   '>
        {children}
    </div>
      </>
  )
}

export default Modal