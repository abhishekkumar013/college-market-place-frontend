import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RiAccountPinCircleLine } from 'react-icons/ri'
import { VscGitPullRequestGoToChanges } from 'react-icons/vsc'
import { GiShoppingCart } from 'react-icons/gi'
import { MdOutlineAddShoppingCart } from 'react-icons/md'
import { FaHandsHelping } from 'react-icons/fa'
import { AiOutlineShoppingCart } from 'react-icons/ai'

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth)
  const [activeTab, setActiveTab] = useState('accountDetails')

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }

  return (
    <div className="hidden md:flex p-4 h-screen  flex-col ">
      <div className="flex items-center mb-4 2xl:mt-20 ms-5">
        <img
          src={user.image}
          alt="Profile"
          className="w-[65px] h-[65px] rounded-full mr-2"
        />

        <div>
          <h3 className="text-lg font-bold">{user.displayName}</h3>
          <p className="text-gray-500 text-sm">{user.email}</p>
          <p className="text-gray-500  text-sm">{user.phone}</p>
        </div>
      </div>

      <div
        className=" space-y-2 ms-6 bg-gray-200 rounded-2xl h-auto py-5 px-5 text-center justify-center 2xl:me-56
      "
      >
        <Link
          to="/profile"
          className={`px-4 py-2 rounded flex items-center flex-shrink-0 ${
            activeTab === 'accountDetails'
              ? 'bg-gray-300 font-bold'
              : 'hover:bg-gray-300'
          }`}
          onClick={() => handleTabClick('accountDetails')}
        >
          <RiAccountPinCircleLine />
          <span className="text-black font-semibold ml-2">Account Details</span>
        </Link>
        <Link
          to="/profile/request"
          className={`px-4 py-2 rounded flex items-center flex-shrink-0 ${
            activeTab === 'yourRequest'
              ? 'bg-gray-300 font-bold'
              : 'hover:bg-gray-300'
          }`}
          onClick={() => handleTabClick('yourRequest')}
        >
          <VscGitPullRequestGoToChanges />
          <span className="text-black font-semibold ml-2">Your's Request</span>
        </Link>
        <Link
          to="/profile/sales"
          className={`px-4 py-2 rounded flex items-center flex-shrink-0 ${
            activeTab === 'yourSale'
              ? 'bg-gray-300 font-bold'
              : 'hover:bg-gray-300'
          }`}
          onClick={() => handleTabClick('yourSale')}
        >
          <AiOutlineShoppingCart />
          <span className="text-black font-semibold  ml-2">Your's Sale</span>
        </Link>
        <Link
          to="/profile/product"
          className={`px-4 py-2 rounded flex items-center flex-shrink-0 ${
            activeTab === 'yourProduct'
              ? 'bg-gray-300 font-bold'
              : 'hover:bg-gray-300'
          }`}
          onClick={() => handleTabClick('yourProduct')}
        >
          <MdOutlineAddShoppingCart />
          <span className="text-black font-semibold ml-2">Your's Product</span>
        </Link>
        <Link
          to="/profile/review-orders"
          className={`px-4 py-2 rounded flex items-center flex-shrink-0 ${
            activeTab === 'review-orders'
              ? 'bg-gray-300 font-bold'
              : 'hover:bg-gray-300'
          }`}
          onClick={() => handleTabClick('review-orders')}
        >
          <MdOutlineAddShoppingCart />
          <span className="text-black font-semibold ml-2">Review's Order</span>
        </Link>
        {/* my-orders */}
        <Link
          to="/profile/my-orders"
          className={`px-4 py-2 rounded flex items-center flex-shrink-0 ${
            activeTab === 'my-orders'
              ? 'bg-gray-300 font-bold'
              : 'hover:bg-gray-300'
          }`}
          onClick={() => handleTabClick('my-orders')}
        >
          <MdOutlineAddShoppingCart />
          <span className="text-black font-semibold ml-2">My Orders</span>
        </Link>
        <Link
          to="/contact-us"
          className={`px-4 py-2 rounded flex items-center flex-shrink-0 ${
            activeTab === 'help' ? 'bg-gray-300 font-bold' : 'hover:bg-gray-300'
          }`}
          onClick={() => handleTabClick('help')}
        >
          <FaHandsHelping />
          <span className="text-black font-semibold ml-2">Help</span>
        </Link>
      </div>
    </div>
  )
}

export default UserProfile
