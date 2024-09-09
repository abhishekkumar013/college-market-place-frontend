import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMyOrder } from '../../store/slices/productSlice'
import Loader from '../Loaders/Loader'

const MyOrder = () => {
  const { myOrder, loading } = useSelector((state) => state.product)
  const dispatch = useDispatch()
  console.log(myOrder)

  useEffect(() => {
    dispatch(getAllMyOrder())
  }, [dispatch])

  if (loading) {
    return (
      <div className="mt-5 md:h-screen md:flex md:justify-center items-center md:-mt-20">
        <div className=" p-8 text-center">
          <Loader />
        </div>
      </div>
    )
  }

  if (myOrder && myOrder.length === 0) {
    return (
      <div className="mt-5 md:h-screen md:flex md:justify-center items-center md:-mt-20">
        <div className="bg-white shadow-md rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">No orders placed yet</h2>
          <p className="text-gray-500">
            You haven't placed any orders yet. Start shopping to see your order
            history here.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="hidden sm:grid sm:grid-cols-4 font-semibold p-4 border-b bg-gray-50">
          <span className="col-span-2">Product Details</span>
          <span>Seller</span>
          <span>Status</span>
        </div>
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
          {myOrder.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:grid sm:grid-cols-4 items-center p-4 border-b last:border-b-0 hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3 w-full sm:w-auto mb-2 sm:mb-0 col-span-2">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={item?.product?.image?.url}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow sm:flex-grow-0">
                  <p className="font-semibold">{item.product.name}</p>
                  {/* <p className="text-sm text-gray-600 line-through">
                    MRP: ₹{item.product.price}
                  </p> */}
                  <p className="text-sm font-medium text-green-600">
                    Price: ₹{item.product.finalPrice}
                  </p>
                </div>
              </div>
              <div className="w-full sm:w-auto text-center sm:text-left mb-2 sm:mb-0">
                {item.seller.displayName}
              </div>
              <div className="w-full sm:w-auto text-center sm:text-left mb-2 sm:mb-0">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    item.status === 'delivered'
                      ? 'bg-green-100 text-green-800'
                      : item.status === 'cancelled'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyOrder
