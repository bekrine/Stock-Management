import React, { useState } from 'react'
import {Link} from 'react-router-dom'

function Navbar() {
    const [toggle, setToggel] = useState(false)
    return (
        <nav className="p-3 bg-gray-50 rounded border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <Link href="/" className="flex items-center">
                    <img src="" className="mr-3 h-6 sm:h-10" alt=" Logo" />
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                </Link>
                <button onClick={() => setToggel(!toggle)} data-collapse-toggle="navbar-solid-bg" type="button" className="inline-flex justify-center items-center ml-3 text-gray-400 rounded-lg md:hidden hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-500" aria-controls="navbar-solid-bg" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        {
                            toggle ?
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                :
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />

                        }
                    </svg>
                </button>
                <div className={toggle ? 'block w-full md:block md:w-auto' : " hidden w-full md:block md:w-auto"} id="navbar-solid-bg">
                    <ul className="flex flex-col mt-4 bg-gray-50 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                        <li>
                            <Link to={'/'} className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">tous les produits</Link>
                        </li>
                       
                        
                    </ul>
                </div>
            </div>
        </nav>


    )
}

export default Navbar