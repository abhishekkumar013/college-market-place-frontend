import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RequestCard from '../components/RequestCard'
import AddNewRequest from './AddNewRequest'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRequest } from '../store/slices/requestslice'
import Loader from '../components/Loaders/Loader'
import Layout from '../components/Layout/Layout'

const ProducRequesttList = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { allrequest, loading } = useSelector((state) => state.request)
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const refreshRequests = () => {
    dispatch(getAllRequest())
  }

  useEffect(() => {
    refreshRequests()
  }, [isDialogOpen])

  if (loading && allrequest.length == 0 && !isDialogOpen) {
    return (
      <Layout
        title="Product Request"
        description="KIITMart's request page displays existing product requests and allows users to submit new requests. Customers can view a list of current requests including product names and quantities. The 'Add New Request' feature enables users to easily input desired products and quantities, facilitating product sourcing and availability on the platform."
        keywords="KIITMart, product request, customer demands, inventory requests, product sourcing, e-commerce, marketplace requests, product availability, customer needs, shopping list"
        author="Abhishek Kumar"
      >
        <div className="mt-5 md:h-screen md:flex md:justify-center items-center md:-mt-20">
          <div className=" p-8 text-center">
            <Loader />
          </div>
        </div>
      </Layout>
    )
  }

  if (allrequest && allrequest.length == 0 && !isDialogOpen) {
    return (
      <Layout
        title="Product Request"
        description="KIITMart's request page displays existing product requests and allows users to submit new requests. Customers can view a list of current requests including product names and quantities. The 'Add New Request' feature enables users to easily input desired products and quantities, facilitating product sourcing and availability on the platform."
        keywords="KIITMart, product request, customer demands, inventory requests, product sourcing, e-commerce, marketplace requests, product availability, customer needs, shopping list"
        author="Abhishek Kumar"
      >
        <div className="mt-5 md:h-screen md:flex md:justify-center items-center md:-mt-20">
          <div className="bg-white shadow-md rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">No request yet</h2>

            <p className="text-gray-500 mb-4">Back here soon to see request!</p>
            <button
              onClick={() => setIsDialogOpen(true)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full text-sm sm:text-base"
            >
              Add New Request
            </button>
          </div>
        </div>
      </Layout>
    )
  }
  return (
    <Layout
      title="Product Request"
      description="KIITMart's request page displays existing product requests and allows users to submit new requests. Customers can view a list of current requests including product names and quantities. The 'Add New Request' feature enables users to easily input desired products and quantities, facilitating product sourcing and availability on the platform."
      keywords="KIITMart, product request, customer demands, inventory requests, product sourcing, e-commerce, marketplace requests, product availability, customer needs, shopping list"
      author="Abhishek Kumar"
    >
      <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex justify-between items-center p-4 sm:p-6 border-b">
            <h2 className="text-xl sm:text-2xl font-bold">Product List</h2>
            <button
              onClick={() => setIsDialogOpen(true)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full text-sm sm:text-base"
            >
              Add New Request
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-md md:p-4 sm:p-6">
            <div className="flex items-center font-bold mb-2 px-4 sm:px-6 text-sm sm:text-base">
              <span className="flex-1">Product Name</span>
              <span className="w-20 text-center">Quantity</span>
              <span className="w-20 text-center">Action</span>
            </div>
            <div className="max-h-96 2xl:max-h-[600px] overflow-y-auto">
              {allrequest.map((product, index) => (
                <RequestCard Request={product} key={product._id} />
              ))}
            </div>
          </div>
        </div>
        <AddNewRequest
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      </div>
    </Layout>
  )
}

export default ProducRequesttList
