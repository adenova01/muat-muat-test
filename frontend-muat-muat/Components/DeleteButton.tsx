"use client"

import { useRouter } from 'next/navigation'
import React from 'react'
import Swal from 'sweetalert2'

export default function DeleteButton({ id }: {
  id: number
}) {

  const navigate = useRouter();

  const deleteClick = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteAction = await fetch(`http://localhost:3031/api/products/${id}`, {
          method: "DELETE"
        })
        const response = await deleteAction.json();
        if(response.status){
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          navigate.refresh();
        }
      }
    });
  }

  return (
    <button onClick={() => deleteClick()} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
  )
}
