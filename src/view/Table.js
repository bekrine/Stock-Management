import React from 'react'
import Recherch from './Recherch'

function Table() {
  return (
      <>
      <Recherch/>
    <div className="overflow-x-auto relative">
    <table className="mx-auto my-2 w-[80%] text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="py-3 px-6 rounded-l-lg">
                Nom Produit
                </th>
                <th scope="col" className="py-3 px-6">
                    Quantité
                </th>
                <th scope="col" className="py-3 px-6 rounded-r-lg">
                    Prix
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th>
                <td className="py-4 px-6">
                    1
                </td>
                <td className="py-4 px-6">
                    $2999
                </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td className="py-4 px-6">
                    1
                </td>
                <td className="py-4 px-6">
                    $1999
                </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Magic Mouse 2
                </th>
                <td className="py-4 px-6">
                   1
                </td>
                <td className="py-4 px-6">
                    $99
                </td>
            </tr>
        </tbody>
    </table>
</div>
      </>
  )
}

export default Table