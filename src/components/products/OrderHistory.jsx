import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllReviewOrder,
  setMyPlacedProduct,
  updateOrder,
} from '../../store/slices/productSlice'
import Loader from '../Loaders/Loader'

const OrderHistory = () => {
  const { MyProductPlaced, loading } = useSelector((state) => state.product)
  const dispatch = useDispatch()

  const handleUpadet = ({ id, status }) => {
    const dataobj = {
      status: status,
      orderId: id,
    }
    if (status === 'cancelled') {
      if (!window.confirm('Are you sure you want to reject this order?')) {
        return
      }
    }
    dispatch(updateOrder(dataobj)).then(() => {
      const updatedOrders = MyProductPlaced.filter((order) => order._id !== id)
      dispatch(setMyPlacedProduct(updatedOrders))
    })
  }

  useEffect(() => {
    dispatch(getAllReviewOrder())
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

  if (MyProductPlaced && MyProductPlaced.length === 0) {
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
          <span>Sold to</span>
          <span>Review</span>
        </div>
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
          {MyProductPlaced.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:grid sm:grid-cols-4 items-center p-4 border-b last:border-b-0 hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3 w-full sm:w-auto mb-2 sm:mb-0 col-span-2">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={item.product.image}
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
                {item.buyer.displayName}
              </div>
              <div className="flex space-x-2 justify-center sm:justify-start">
                <button
                  onClick={() =>
                    handleUpadet({ id: item._id, status: 'cancelled' })
                  }
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-full text-sm"
                >
                  Reject
                </button>
                <button
                  onClick={() =>
                    handleUpadet({ id: item._id, status: 'delivered' })
                  }
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-sm"
                >
                  Approve
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrderHistory
