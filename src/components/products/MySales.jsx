import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loaders/Loader'
import { getAllMySales } from '../../store/slices/productSlice'

const MySales = () => {
  const { saleout, loading } = useSelector((state) => state.product)
  console.log('HII ', saleout)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllMySales())
  }, [])

  if (loading) {
    return (
      <div className="mt-5 md:h-screen md:flex md:justify-center items-center md:-mt-20">
        <div className="p-8 text-center">
          <Loader />
        </div>
      </div>
    )
  }

  if (!saleout || saleout.length === 0) {
    return (
      <div className="mt-5 md:h-screen md:flex md:justify-center items-center md:-mt-20">
        <div className="bg-white shadow-md rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">No sales yet</h2>
          <p className="text-gray-500">
            You haven't made any sales yet. Keep promoting your products!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-6">My Sales</h1>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="hidden sm:grid sm:grid-cols-4 font-semibold p-4 border-b bg-gray-50">
          <span className="col-span-2">Product Details</span>
          <span>Sold On</span>
          <span>Sold To</span>
        </div>
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
          {saleout.map((sale) => (
            <div
              key={sale._id}
              className="flex flex-col sm:grid sm:grid-cols-4 items-start sm:items-center p-4 border-b last:border-b-0 hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3 w-full sm:w-auto mb-2 sm:mb-0 col-span-2">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={sale.product.image}
                    alt={sale.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow sm:flex-grow-0">
                  <p className="font-semibold">{sale.product.name}</p>
                  <p className="text-sm font-medium text-green-600">
                    Price: ₹{sale.product.finalPrice}
                  </p>
                </div>
              </div>
              <div className="w-full sm:w-auto text-left sm:text-left mb-2 sm:mb-0">
                <span className="sm:hidden font-semibold mr-2">Sold on:</span>
                {sale.saleTime}
              </div>
              <div className="w-full sm:w-auto text-left sm:text-left">
                <span className="sm:hidden font-semibold mr-2">Sold to:</span>
                {sale.buyer.displayName}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MySales
