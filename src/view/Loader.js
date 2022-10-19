import React from 'react'

function Loader() {
  return (
      <div className='fixed inset-0 bg-slate-400 opacity-90 z-[1000]'>

    <div className="flex justify-center items-center">
  <div className="fixed top-[50%] left-[50%]  z-[1000] spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
    <span className="visually-hidden"></span>
  </div>
</div>
      </div>

  )
}

export default Loader