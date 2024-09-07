import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  deleteMyProduct,
  getAllMyProduct,
  updateProductStatus,
} from '../../store/slices/productSlice'
import ProductEditDialog from '../utils/ProductEditDialog'

const MyProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const handleOpen = (product) => {
    setSelectedProduct(product)
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleUpdateStatus = () => {
    dispatch(updateProductStatus(product._id))
    dispatch(getAllMyProduct())
  }

  return (
    <div className="flex flex-col md:grid md:grid-cols-5 items-center p-4 border-b last:border-b-0 hover:bg-gray-50 md:me-2">
      <div className="flex items-center space-x-3 mb-2 md:mb-0 col-span-2">
        <img
          src={product.image}
          alt={product.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <span className="font-semibold">{product.name}</span>
      </div>
      <div className="flex flex-col items-start mb-2 md:mb-0">
        <div className="flex gap-2">
          Mrp:
          <span className="text-gray-500 line-through"> ₹{product.mrp}</span>
        </div>
        <span className="font-semibold text-green-600">
          Price: ₹{product.finalPrice}
        </span>
        <span className="text-sm text-blue-600">
          Discount: {product.discount}% off
        </span>
      </div>
      <div className="mb-2 md:mb-0">{product.quantity}</div>
      <div className="flex space-x-2">
        <button
          onClick={handleUpdateStatus}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          {product.isSold ? 'Unsold' : 'Sold'}
        </button>
        <button
          onClick={handleOpen}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Update
        </button>
      </div>
      <ProductEditDialog open={open} onClose={handleClose} product={product} />
    </div>
  )
}

export default MyProductCard
