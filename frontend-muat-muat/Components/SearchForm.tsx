"use client"

import { setKeyword } from '@/store/globalState';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchForm() {

  const dispatch = useDispatch()

  const searchProduct = useDebouncedCallback((value: string) => {
     dispatch(setKeyword(value))
  }, 1500);

  return (
    <div className="mt-5">
      <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Search Product</label>
      <input onChange={e => searchProduct(e.target.value)} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Product Name" required />
    </div>
  )
}
