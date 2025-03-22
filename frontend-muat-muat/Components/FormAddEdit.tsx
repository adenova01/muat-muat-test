"use client"

import { Product } from '@/interface/product';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

export default function FormAddEdit({ data }: {
  data: Product | null
}) {

  const product = useSelector((state: RootState) => state.product);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const navigate = useRouter();
  const dataParam = data;

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const checkName = product.find(item => {
      return item.name === name
    })

    if(checkName){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "name already used!",
      });
      return;
    }

    let uri = "http://localhost:3031/api/products";
    let method = "POST";

    if(dataParam){
      uri = `http://localhost:3031/api/products/${dataParam.id}`
      method = "PUT"
    }

    const response = await fetch(uri, {
      method: method,
      body: JSON.stringify({
        name: name,
        price: price,
        stock: stock
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await response.json();
    if(data){
      navigate.push("/");
    }
  }

  useEffect(() => {
    console.log(data);    
    if(data){
      setName(data.name);
      setPrice(data.price.toString());
      setStock(data.stock.toString());
    }
  }, [data]);

  return (
    <form onSubmit={submitForm} className="max-w-sm mx-auto">
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
        <input type="text" defaultValue={name} onChange={e => setName(e.target.value)} name="name" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Xiaomi" required />
      </div>
      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
        <input type="number" defaultValue={price} onChange={e => setPrice(e.target.value)} name="price" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
      </div>
      <div className="mb-5">
        <label htmlFor="password1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stock</label>
        <input type="number" defaultValue={stock} name='stock' onChange={e => setStock(e.target.value)} id="password1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
      </div>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        { data ? "Update" : "Add" }
      </button>
    </form>
  )
}
