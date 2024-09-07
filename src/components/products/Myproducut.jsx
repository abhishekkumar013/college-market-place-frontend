import React, { useEffect } from 'react'
import MyProductCard from './MyProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMyProduct } from '../../store/slices/productSlice'
import Loader from '../Loaders/Loader'

const Myproduct = () => {
  const { myProduct, shouldRefreshProductList, loading } = useSelector(
    (state) => state.product,
  )
  const dispatch = useDispatch()
  console.log(myProduct)

  useEffect(() => {
    dispatch(getAllMyProduct())
  }, [dispatch])

  if (loading) {
    return (
      <div className="mt-5 md:h-screen md:flex md:justify-center items-center md:-mt-20">
        <Loader />
      </div>
    )
  }

  if (myProduct && myProduct.length === 0) {
    return (
      <div className="mt-5 md:h-screen md:flex md:justify-center items-center md:-mt-20">
        <div className="bg-white shadow-md rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">No products added yet</h2>
          <p className="text-gray-500">
            You haven't added any products yet. Start adding products to see
            them here.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-6">My Products</h1>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="hidden md:grid md:grid-cols-5 font-semibold p-4 border-b bg-gray-50">
          <span className="col-span-2">Products</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Actions</span>
        </div>
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
          {myProduct.map((product) => (
            <MyProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Myproduct
