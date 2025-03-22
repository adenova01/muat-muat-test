"use client"

import { Product } from '@/interface/product'
import React, { useEffect, useState } from 'react'
import ButtonSortStock from './ButtonSortStock'
import SetFavoriteButton from './SetFavoriteButton'
import Link from 'next/link'
import DeleteButton from './DeleteButton'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { setProduct } from '@/store/globalState'

export default function DataResult() {
  const sort = useSelector((state: RootState) => state.sort)
  const keyword = useSelector((state: RootState) => state.keyword)
  const product = useSelector((state: RootState) => state.product)
  const [isFetching, setIsFetching] = useState(true);

  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      setIsFetching(true);    
      const fetchProduct = await fetch(
        `http://localhost:3031/api/products?keyword=${keyword}&sort=${sort}`
      );
      const jsonData = await fetchProduct.json();
      const product: Product[] = jsonData;
      dispatch(setProduct(product))
      setIsFetching(false);
    })()
  }, [sort, keyword])

  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-5">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="px-6 py-3">
            Price
          </th>
          <th scope="col" className="px-6 py-3">
            Stock
            <ButtonSortStock />
          </th>
          <th scope="col" className="px-6 py-3">
            Is Favorite
          </th>
          <th scope="col" className="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {
          (product.length > 0 && !isFetching) ? product.map((item, key) => {
            return <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.name}
              </th>
              <td className="px-6 py-4">{item.price}</td>
              <td className="px-6 py-4">{item.stock}</td>
              <td className="px-6 py-4">
                {
                  item.is_favorite ? <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">Yes</span> : <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-yellow-900 dark:text-yellow-300">No</span>
                }
              </td>
              <td className="px-6 py-4">
                <SetFavoriteButton productData={item} />
                <Link href={`/add-edit/${item.id}`} type="button" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Edit</Link>
                <DeleteButton id={item.id} />
              </td>
            </tr>
          }) : ( isFetching ? <tr>
            <td colSpan={5} className="text-center"><h3>Fetching data, please wait...</h3></td>
          </tr> : <tr>
            <td colSpan={5} className="text-center"><h3>No product found</h3></td>
          </tr>)
        }
      </tbody>
    </table>
  )
}
