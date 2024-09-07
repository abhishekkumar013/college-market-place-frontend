import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { User, ShoppingCart, Info, Phone, LogOut } from 'lucide-react'
import { logoutUser } from '../../store/slices/authSlice'

const MobileUserActions = () => {
  const { user } = useSelector((state) => state.auth)
  const { cart } = useSelector((state) => state.product)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/login')
  }

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center lg:hidden">
      <Link
        to={'/about-us'}
        className="flex items-center text-gray-700 hover:text-white hover:bg-green-500 px-3 py-2 rounded-md transition duration-300 ease-in-out mb-2 lg:mb-0 lg:mr-2 w-full lg:w-auto"
      >
        <Info className="mr-2" size={20} />
        <span>About Us</span>
      </Link>
      <Link
        to={'/contact-us'}
        className="flex items-center text-gray-700 hover:text-white hover:bg-green-500 px-3 py-2 rounded-md transition duration-300 ease-in-out mb-2 lg:mb-0 lg:mr-2 w-full lg:w-auto"
      >
        <Phone className="mr-2" size={20} />
        <span>Contact Us</span>
      </Link>
      <Link
        to={'/cart'}
        className="flex items-center text-gray-700 hover:text-white hover:bg-green-500 px-3 py-2 rounded-md transition duration-300 ease-in-out mb-2 lg:mb-0 lg:mr-2 w-full lg:w-auto"
      >
        <ShoppingCart className="mr-2" size={20} />
        <span className="relative">
          Cart
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-6 bg-red-500 text-white text-xs font-bold rounded-full h-5 min-w-5 flex items-center justify-center px-1">
              {cart.length}
            </span>
          )}
        </span>
      </Link>
      <Link
        to="/profile"
        className="flex items-center text-gray-700 hover:text-white hover:bg-green-500 px-3 py-2 rounded-md transition duration-300 ease-in-out mb-2 lg:mb-0 lg:mr-2 w-full lg:w-auto"
      >
        {user?.image ? (
          <img
            src={user.image}
            alt="User"
            className="w-6 h-6 rounded-full mr-2"
          />
        ) : (
          <User className="mr-2" size={20} />
        )}
        <span>Profile</span>
      </Link>
      <button
        onClick={handleLogout}
        className="flex items-center text-gray-700 hover:text-white hover:bg-green-500 px-3 py-2 rounded-md transition duration-300 ease-in-out w-full lg:w-auto"
      >
        <LogOut className="mr-2" size={20} />
        <span>Logout</span>
      </button>
    </div>
  )
}

export default MobileUserActions
