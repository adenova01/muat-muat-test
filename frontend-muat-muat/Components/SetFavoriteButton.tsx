"use client"

import { Product } from '@/interface/product';
import { setProduct } from '@/store/globalState';
import { RootState } from '@/store/store';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function SetFavoriteButton({ productData }: {
  productData: Product
}) {

  const keyword = useSelector((state: RootState) => state.keyword);
  const sort = useSelector((state: RootState) => state.sort);

  const dispatch = useDispatch()

  const setFavorite = async () => {
      const setFavorite = await fetch(`http://localhost:3031/api/products/set-favorite/${productData.id}`, {
        method: "PUT"
      })
      const response = await setFavorite.json();
      if(response){
        const fetchProduct = await fetch(
          `http://localhost:3031/api/products?keyword=${keyword}&sort=${sort}`
        );
        const jsonData = await fetchProduct.json();
        const product: Product[] = jsonData;
        dispatch(setProduct(product))
      }
  }

  return (
    <button onClick={setFavorite} type="button" className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500 mr-3">
      <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
        <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
      </svg>
      <span className="sr-only">Icon description</span>
    </button>
  )
}
