import React from 'react'

const CartCard = ({
  _id,
  name,
  finalPrice,
  discount,
  mrp,
  image,
  quantity,
  onRemove,
  onUpdateQuantity,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src={image} alt={name} className="w-20 h-20 object-cover" />
          <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <div className="mt-4 flex items-center space-x-2">
              <button
                onClick={() => onUpdateQuantity(quantity - 1)}
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300 transition duration-300"
              >
                -
              </button>
              <span className="font-semibold">{quantity}</span>
              <button
                onClick={() => onUpdateQuantity(quantity + 1)}
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300 transition duration-300"
              >
                +
              </button>
              <button
                onClick={() => onRemove(_id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 ml-4"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm">
            <span className="font-semibold">Price:</span>
            <span className="font-bold ml-2">₹{finalPrice * quantity}</span>
          </p>
          <p className="text-sm text-green-600">
            <span className="font-semibold">Discount:</span>
            <span className="ml-2">{discount}% off</span>
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-semibold">MRP:</span>
            <span className="line-through ml-2">₹{mrp * quantity}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default CartCard
