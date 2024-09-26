import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ShoppingCart, ShoppingBag } from 'lucide-react'

import Layout from '../components/Layout/Layout'
import Loader from '../components/Loaders/Loader'
import {
  addNewToCart,
  getProductDetails,
  PlacedOrder,
} from '../store/slices/productSlice'

const ProductDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { productDetails, loading } = useSelector((state) => state.product)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    dispatch(getProductDetails(id))
  }, [dispatch, id])

  const handleAddToCart = () => {
    dispatch(addNewToCart({ ...productDetails, quantity }))
  }

  const generateProductWhatsAppMessage = () => {
    const discount = (
      ((productDetails.mrp - productDetails.finalPrice) / productDetails.mrp) *
      100
    ).toFixed(2)
    const totalPrice = productDetails.finalPrice * quantity

    const message =
      `🛒 Order Details:\n\n` +
      `Product: ${productDetails.name}\n` +
      `Quantity: ${quantity}\n` +
      `Price: ₹${productDetails?.finalPrice}\n` +
      `Total: ₹${totalPrice}\n` +
      `Discount: ${discount}%\n` +
      `MRP: ₹${productDetails.mrp}\n\n` +
      `Seller: ${productDetails.sellerName}`

    return `https://wa.me/91${productDetails?.phone}?text=${encodeURIComponent(
      message,
    )}`
  }

  const handleOrderNow = () => {
    const dataobj = {
      seller: productDetails.seller,
      product: productDetails._id,
    }
    dispatch(PlacedOrder(dataobj))

    const link = generateProductWhatsAppMessage()
    window.open(link, '_blank')
  }

  if (loading) {
    return (
      <Layout title="Product Details">
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      </Layout>
    )
  }

  if (!productDetails) {
    return (
      <Layout title="Product Not Found">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title={productDetails.name}>
      <div className="container mx-auto px-4 py-4 sm:py-8 max-w-6xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Product Image */}
            <div className="w-full md:w-2/5 p-4 flex items-center justify-center bg-gray-100">
              <div className="w-full max-w-[250px] sm:max-w-[350px] md:max-w-full md:h-[400px] lg:h-[360px] 2xl:h-[600px] flex items-center justify-center overflow-hidden rounded-lg">
                <img
                  src={productDetails.image.url}
                  alt={productDetails.name}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="w-full md:w-3/5 p-4 md:p-6 2xl:p-8">
              <h1 className="text-2xl md:text-3xl 2xl:text-4xl font-bold mb-2 md:mb-4 2xl:mb-6 text-gray-800">
                {productDetails.name}
              </h1>
              <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                {productDetails.desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 md:mb-6">
                <div className="bg-gray-50 p-3 md:p-4 rounded-lg shadow-sm">
                  <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-3 text-gray-800">
                    Pricing
                  </h2>
                  <hr className="mb-3 border-t-2 border-gray-200" />
                  <p className="text-sm md:text-base mb-1">
                    <span className="font-medium">Quantity: </span>
                    {productDetails.quantity}
                  </p>
                  <p className="text-sm md:text-base mb-1">
                    <span className="font-medium">MRP:</span> ₹
                    {productDetails.mrp}
                  </p>
                  <p className="text-sm md:text-base mb-1">
                    <span className="font-medium">Discount:</span>{' '}
                    {productDetails.discount}%
                  </p>
                  <p className="text-sm md:text-base mb-1">
                    <span className="font-medium">Additional Charge:</span> ₹
                    {productDetails.additionalCharge}
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-green-600 mt-2">
                    Final Price: ₹{productDetails.finalPrice}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 md:p-4 rounded-lg shadow-sm">
                  <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-3 text-gray-800">
                    Seller Information
                  </h2>
                  <hr className="mb-3 border-t-2 border-gray-200" />
                  <p className="text-sm md:text-base">
                    <span className="font-medium">Seller Name:</span>{' '}
                    {productDetails.sellerName}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="bg-green-500 text-white py-2 md:py-3 px-4 md:px-6 rounded-lg hover:bg-green-600 transition-all text-base md:text-lg font-semibold flex-grow flex items-center justify-center"
                >
                  <ShoppingCart className="mr-2" size={20} />
                  Add to Cart
                </button>
                <button
                  onClick={handleOrderNow}
                  className="bg-green-600 text-white py-2 md:py-3 px-4 md:px-6 rounded-lg hover:bg-green-700 transition-all text-base md:text-lg font-semibold flex-grow flex items-center justify-center"
                >
                  <ShoppingBag className="mr-2" size={20} />
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProductDetails
