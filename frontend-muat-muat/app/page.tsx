import DataResult from "@/Components/DataResult";
import SearchForm from "@/Components/SearchForm";
import Link from "next/link";

export default async function Home() {
 

  return (
    <div className="relative overflow-x-auto p-5">
      <Link href={"/add-edit"} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Product</Link>
      <SearchForm />
      <DataResult />
      {/* <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-5">
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
            product.length > 0 ? product.map((item, key) => {
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
            }) : <tr>
              <td colSpan={5} className="text-center"><h3>No product found</h3></td>
            </tr>
          }
        </tbody>
      </table> */}
    </div>
  );
}
