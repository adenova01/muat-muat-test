"use client"

import { setSort, setStateSort } from '@/store/globalState'
import { RootState } from '@/store/store'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function ButtonSortPrice() {

  const sort = useSelector((state: RootState) => state.sort)
  const stateSort = useSelector((state: RootState) => state.stateSrot)
  const keyword = useSelector((state: RootState) => state.keyword)
  const dispatch = useDispatch()
  const navigate = useRouter();

  const sorting = () => {    
    let state = ""
    if(stateSort == "-"){
      state = "-";
    } else {
      state = ""
    }
    dispatch(setSort(`${stateSort}price`))
    dispatch(setStateSort(state))
    navigate.replace(`/?keyword=${keyword}&sort=${sort}`)
  }

  return (
    <button onClick={() => sorting()} type="button" className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500 ml-2">
      <svg fill="#fff" height="10px" width="10px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 490 490">
        <g>
          <polygon points="85.877,154.014 85.877,428.309 131.706,428.309 131.706,154.014 180.497,221.213 217.584,194.27 108.792,44.46 
		0,194.27 37.087,221.213 	"/>
          <polygon points="404.13,335.988 404.13,61.691 358.301,61.691 358.301,335.99 309.503,268.787 272.416,295.73 381.216,445.54 
		490,295.715 452.913,268.802 	"/>
        </g>
      </svg>
      <span className="sr-only">Icon description</span>
    </button>
  )
}
