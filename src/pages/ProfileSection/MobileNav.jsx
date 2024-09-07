import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RiAccountPinCircleLine } from 'react-icons/ri'
import { VscGitPullRequestGoToChanges } from 'react-icons/vsc'
import { IoGitPullRequestOutline } from 'react-icons/io5'
import { MdOutlineAddShoppingCart, MdOutlinePreview } from 'react-icons/md'
import { FaHandsHelping, FaBars } from 'react-icons/fa'
import { AiOutlineShoppingCart, AiOutlineClose } from 'react-icons/ai'

const MobileNav = () => {
  const { user } = useSelector((state) => state.auth)

  const [isNavVisible, setIsNavVisible] = useState(false)

  const handleTabClick = () => {
    setIsNavVisible(false)
  }

  const toggleNavVisibility = () => {
    setIsNavVisible((prevState) => !prevState)
  }

  return (
    <div className="p-4 h-auto flex flex-col items-center md:hidden relative">
      {/* User Profile and Menu Icon */}
      <div className="flex items-center mb-4 justify-between w-full px-4">
        <div className="flex items-center">
          <img
            src={user.image}
            alt="Profile"
            className="w-12 h-12 rounded-full mr-2"
          />
          <div>
            <h3 className="text-lg font-bold">{user.displayName}</h3>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-gray-500">{user.phone}</p>
          </div>
        </div>
        <button onClick={toggleNavVisibility} className="lg:hidden text-xl">
          <FaBars />
        </button>
      </div>

      {/* Popup Navigation Links */}
      {isNavVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-[80%] max-h-[80vh] overflow-y-auto shadow-xl">
            {/* Header with close button */}
            <div className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-t-lg">
              <h2 className="font-semibold text-lg">Open Your Choice</h2>
              <button
                onClick={() => setIsNavVisible(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <AiOutlineClose size={20} />
              </button>
            </div>

            {/* Menu Items */}
            <div className="px-4 py-2">
              <Link
                to="/profile"
                className="flex items-center py-2"
                onClick={handleTabClick}
              >
                <RiAccountPinCircleLine className="mr-3" size={20} />
                <span>Profile</span>
              </Link>
              <Link
                to="/profile/request"
                className="flex items-center py-2"
                onClick={handleTabClick}
              >
                <IoGitPullRequestOutline className="mr-3" size={20} />
                <span>Your's Request</span>
              </Link>
              <Link
                to="/profile/sales"
                className="flex items-center py-2"
                onClick={handleTabClick}
              >
                <AiOutlineShoppingCart className="mr-3" size={20} />
                <span>Your's Sale</span>
              </Link>
              <Link
                to="/profile/product"
                className="flex items-center py-2"
                onClick={handleTabClick}
              >
                <MdOutlineAddShoppingCart className="mr-3" size={20} />
                <span>Your's Product</span>
              </Link>
              <Link
                to="/profile/review-orders"
                className="flex items-center py-2"
                onClick={handleTabClick}
              >
                <MdOutlinePreview className="mr-3" size={20} />
                <span>Review's Orders</span>
              </Link>
              <Link
                to="/profile/my-orders"
                className="flex items-center py-2"
                onClick={handleTabClick}
              >
                <MdOutlineAddShoppingCart className="mr-3" size={20} />
                <span>My Orders</span>
              </Link>
              <Link
                to="/contact-us"
                className="flex items-center py-2"
                onClick={handleTabClick}
              >
                <FaHandsHelping className="mr-3" size={20} />
                <span>Help</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MobileNav
