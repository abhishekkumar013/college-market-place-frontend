import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CgProfile } from 'react-icons/cg'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../store/slices/authSlice'
import ReactGA from 'react-ga'
const UserActions = () => {
  const { user } = useSelector((state) => state.auth)
  const { cart } = useSelector((state) => state.product)
  const navigate = useNavigate()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const dispatch = useDispatch()

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

  const handleLogout = () => {
    ReactGA.event({
      category: 'logout',
      action: 'Clicked logout',
      label: 'logout Button',
    })
    dispatch(logoutUser())
    navigate('/login')
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="mt-4 md:mt-0 md:ml-auto lg:flex flex-col md:flex-row items-center hidden ">
      <Link
        to={'/about-us'}
        className="text-gray-700 hover:text-white hover:bg-green-500 px-3 py-2 rounded-md transition duration-300 ease-in-out mb-2 md:mb-0 md:mx-1"
      >
        About Us
      </Link>
      <Link
        to={'/contact-us'}
        className="text-gray-700 hover:text-white hover:bg-green-500 px-3 py-2 rounded-md transition duration-300 ease-in-out mb-2 md:mb-0 md:mx-1"
      >
        Contact Us
      </Link>
      <Link
        to={'/cart'}
        className="text-gray-700 hover:text-white hover:bg-green-500 px-3 py-2 rounded-md transition duration-300 ease-in-out mb-2 md:mb-0 md:mx-1 relative inline-block"
      >
        <span>Cart</span>
        {
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
            {cart.length || 0}
          </span>
        }
      </Link>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="text-gray-700 hover:text-white hover:bg-gray-300 p-2 rounded-full transition duration-300 ease-in-out md:ml-1"
        >
          {user?.image ? (
            <img src={user.image} alt="User" className="w-6 h-6 rounded-full" />
          ) : (
            <CgProfile size={20} />
          )}
        </button>
        {isDropdownOpen && (
          <div className="absolute hidden lg:block right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
            <Link
              to="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserActions
