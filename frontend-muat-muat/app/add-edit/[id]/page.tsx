import FormAddEdit from '@/Components/FormAddEdit'
import { Product } from '@/interface/product';
import React from 'react'

export default async function page({ params }: {params: {id: number}}) {

  const { id } = await params;
  const fetchProduct = await fetch(`http://localhost:3031/api/products/${id}`)
  const jsonData = await fetchProduct.json();
  const productData: Product = jsonData;  

  return (
    <div className="p-5">
      <FormAddEdit data={productData} />
    </div>
  )
}
