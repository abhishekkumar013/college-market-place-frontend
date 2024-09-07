import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { server } from '../main'
import Layout from '../components/Layout/Layout'

const AddNewRequest = ({ isOpen, onClose }) => {
  const [productName, setProductName] = useState('')
  const [quantity, setQuantity] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Handle form submission here
    const dataobj = {
      name: productName,
      quantity,
    }
    const token = localStorage.getItem('token')
    const { data } = await axios.post(`${server}/request/create`, dataobj, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(data)
    if (data.success) {
      toast.success(data.message)
    } else {
      toast.error(data.message)
    }
    // Reset form fields
    setProductName('')
    setQuantity('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <Layout title="home" description="" keywords="" author="">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Add New Request</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="productName"
                className="block text-sm font-medium mb-2"
              >
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium mb-2"
              >
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
              >
                Add Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default AddNewRequest
