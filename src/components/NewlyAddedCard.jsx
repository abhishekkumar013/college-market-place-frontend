import React from 'react'
import { useDispatch } from 'react-redux'
import { addNewToCart, PlacedOrder } from '../store/slices/productSlice'

const NewlyAddedCard = ({ product }) => {
  const dispatch = useDispatch()
  const handleAddToCart = () => {
    dispatch(addNewToCart(product))
  }

  const generateProductWhatsAppMessage = (product) => {
    const discount = (
      ((product.mrp - product.finalPrice) / product.mrp) *
      100
    ).toFixed(2)
    const quantity = product.quantity || 1
    const totalPrice = product.finalPrice * quantity

    const message =
      `🛒 Order Details:\n\n` +
      `Product: ${product.name}\n` +
      `Quantity: ${quantity}\n` +
      `Price: ₹${product.finalPrice}\n` +
      `Total: ₹${totalPrice}\n` +
      `Discount: ${discount}%\n` +
      `MRP: ₹${product.mrp}\n\n` +
      `Seller: ${product.sellerName}`

    return `https://wa.me/91${product.phone}?text=${encodeURIComponent(
      message,
    )}`
  }
  const handleOrderNow = (product) => {
    const dataobj = {
      seller: product.seller,
      product: product._id,
    }
    dispatch(PlacedOrder(dataobj))

    const link = generateProductWhatsAppMessage(product)
    window.open(link, '_blank')
  }

  return (
    <div className="bg-white rounded-lg p-3 flex flex-col items-center border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
      <img
        src={product?.image?.url}
        alt={product.name}
        className="w-full h-24 object-contain mb-1 transition-transform duration-300 ease-in-out transform hover:scale-110"
      />
      <p className="text-center font-semibold text-md hover:text-green-600 transition-colors duration-300 truncate w-full">
        {product.name}
      </p>
      <div className="flex justify-between items-center w-full mt-1">
        <p className="text-green-600 hover:text-green-700 font-bold text-sm transition-colors duration-300">
          ₹{product.finalPrice}
        </p>
        <p className="text-xs text-red-600 hover:text-red-700  transition-colors duration-300">
          {product.discount}% off
        </p>
      </div>
      <p className="text-xs text-gray-500 w-full">
        <span className="line-through">M.R.P: ₹{product.mrp}</span>
      </p>
      <div className="flex flex-col sm:flex-row w-full mt-1 space-y-1 sm:space-y-0 sm:space-x-1">
        {product.isSold ? (
          <button
            disabled
            className="flex-1 bg-red-500 text-white py-1 px-2 lg:py-2 lg:px-2 lg:text-md lg:font-bold rounded-full text-center text-xs cursor-not-allowed"
          >
            Sold Out
          </button>
        ) : (
          <>
            <button
              onClick={handleAddToCart}
              className="w-full bg-green-500 text-white py-1 px-2 lg:py-2 lg:px-2 lg:text-md lg:font-bold rounded-full hover:bg-green-600 transition-colors duration-300 text-xs"
            >
              Add to cart
            </button>
            <button
              onClick={() => handleOrderNow(product)}
              className="w-full bg-green-500 text-white py-1 px-2 lg:py-2 lg:px-2 lg:text-md lg:font-bold rounded-full hover:bg-green-600 transition-colors duration-300 text-xs"
            >
              Buy Now
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default NewlyAddedCard
