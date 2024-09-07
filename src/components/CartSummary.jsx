import React from 'react'
import { useSelector } from 'react-redux'

const CartSummary = ({
  totalPrice,
  totalDiscount,
  totalMRP,
  onPlaceOrder,
  cartItems,
}) => {
  const generateWhatsAppMessage = () => {
    const { user } = useSelector((state) => state.auth)
    const itemDetails = cartItems
      .map(
        (item) =>
          `${item.name}\n` +
          `Quantity: ${item.quantity}\n` +
          `Price: ₹${item.finalPrice}\n` +
          `Total: ₹${item.finalPrice * item.quantity}\n` +
          `Discount: ${item.discount}%\n` +
          `MRP: ₹${item.mrp}\n`,
      )
      .join('\n')

    const message =
      `🛒 Order Summary:\n\n` +
      `${itemDetails}\n` +
      `Total MRP: ₹${totalMRP}\n` +
      `Total Discount: ₹${totalDiscount}\n` +
      `Total Price: ₹${totalPrice}`

    const whatsappNumber = '918540818508'
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
  }

  const handlePlaceOrder = () => {
    const link = generateWhatsAppMessage()
    window.open(link, '_blank')
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mt-4">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Total MRP:</span>
          <span>{totalMRP}</span>
        </div>
        <div className="flex justify-between text-green-600">
          <span>Total Discount:</span>
          <span>-{totalDiscount} off</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total Price:</span>
          <span>{totalPrice}</span>
        </div>
      </div>
      <button
        onClick={handlePlaceOrder}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Place Order via WhatsApp
      </button>
    </div>
  )
}

export default CartSummary
