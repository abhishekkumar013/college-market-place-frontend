// components/Cart.jsx
import React, { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  clearCart,
  PlacedOrder,
  removeProductFromCart,
  updateCartItemQuantity,
} from '../store/slices/productSlice'
import Loader from '../components/Loaders/Loader'
import Layout from '../components/Layout/Layout'

const Cart = () => {
  const { cart, loading } = useSelector((state) => state.product)
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const { totalPrice, totalDiscount, totalMRP } = useMemo(() => {
    return cart.reduce(
      (totals, item) => {
        const quantity = item.quantity || 1
        const itemFinalPrice = parseInt(item.finalPrice) * quantity
        const itemMRP = parseInt(item.mrp) * quantity
        const itemDiscount = itemMRP - itemFinalPrice

        totals.totalPrice += itemFinalPrice
        totals.totalDiscount += itemDiscount
        totals.totalMRP += itemMRP
        return totals
      },
      { totalPrice: 0, totalDiscount: 0, totalMRP: 0 },
    )
  }, [cart])

  const handlePlaceOrder = () => {
    //  TODO: order place function
    console.log('Placing order...')
  }

  const handleUpdateQuantity = (item, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateCartItemQuantity({ id: item._id, quantity: newQuantity }))
    } else {
      dispatch(removeProductFromCart(item._id))
    }
  }

  const handleRemoveItem = (itemId) => {
    dispatch(removeProductFromCart(itemId))
  }

  if (loading && cart.length === 0) {
    return (
      <Layout title="home" description="" keywords="" author="">
        <div className="mt-5 md:h-screen md:flex md:justify-center items-center md:-mt-20">
          <div className=" p-8 text-center">
            <Loader />
          </div>
        </div>
      </Layout>
    )
  }

  if (cart.length === 0) {
    return (
      <Layout
        Title="Cart"
        Description="Browse a variety of product from trusted sellers on KIITMart. View detailed product listings with images, pricing , and seller information. Order effortlessly via WhatsApp or clear your entire cart. Utilize the search bar to find the perfect headphones and enjoy a seamless shopping experience on KIITMart."
        Keywords="KIITMart cart,  online shopping, multiple sellers, WhatsApp ordering, ecommerce cart, product search, clear cart option, India"
        author="Abhishek kumar"
      >
        <div className="container mx-auto p-4 text-center ">
          <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
          <p className="text-4xl md:text-9xl text-gray-400">
            Your cart is empty.
          </p>
        </div>
      </Layout>
    )
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
    <Layout
      Title="Cart"
      Description="Browse a variety of product from trusted sellers on KIITMart. View detailed product listings with images, pricing , and seller information. Order effortlessly via WhatsApp or clear your entire cart. Utilize the search bar to find the perfect headphones and enjoy a seamless shopping experience on KIITMart."
      Keywords="KIITMart cart,  online shopping, multiple sellers, WhatsApp ordering, ecommerce cart, product search, clear cart option, India"
      author="Abhishek kumar"
    >
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Products</h1>
          <button
            onClick={() => dispatch(clearCart())}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Clear cart
          </button>
        </div>
        <div className="hidden md:flex justify-between mb-2 font-semibold">
          <span>Product</span>
          <span>Seller</span>
          <span>Order Here</span>
        </div>
        <div className="space-y-4">
          {cart.map((product) => (
            <div
              key={product._id}
              className="bg-gray-100 p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between"
            >
              <div className="flex items-center space-x-4 mb-4 md:mb-0 md:w-1/2">
                <img
                  src={product?.image?.url}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h2 className="font-semibold">{product.name}</h2>
                  <p className="text-sm">Quantity: {product.quantity || 1}</p>
                  <p className="font-semibold">₹ {product.finalPrice}</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:w-1/2 md:justify-between md:items-center">
                <p className="mb-2 md:mb-0">{product.sellerName}</p>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <button
                    onClick={() => handleRemoveItem(product._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => handleOrderNow(product)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Cart

{
  /* // <div className="container mx-auto p-4">
    //   <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
    //   {cart.length === 0 ? (
    //     <p>Your cart is empty.</p>
    //   ) : (
    //     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    //       <div className="md:col-span-2 space-y-4">
    //         {cart.map((item) => (
    //           <CartCard
    //             key={item._id} 
    //             {...item}
    //             onUpdateQuantity={(newQuantity) =>
    //               handleUpdateQuantity(item, newQuantity)
    //             }
    //             onRemove={() => handleRemoveItem(item._id)}
    //           />
    //         ))}
    //       </div>
    //       <div className="md:col-span-1">
    //         <CartSummary
    //           totalPrice={`₹${totalPrice.toFixed(2)}`}
    //           totalDiscount={`₹${totalDiscount.toFixed(2)}`}
    //           totalMRP={`₹${totalMRP.toFixed(2)}`}
    //           onPlaceOrder={handlePlaceOrder}
    //           cartItems={cart}
    //         />
    //       </div>
    //     </div>
    //   )}
    // </div> */
}
