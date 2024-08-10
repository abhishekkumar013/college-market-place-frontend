import React from 'react'
import { Link } from 'react-router-dom'
import { CgProfile } from 'react-icons/cg'

const UserActions = () => {
  return (
    <div className="mt-4 md:mt-0 md:ml-auto flex flex-col md:flex-row items-center">
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
        className="text-gray-700 hover:text-white hover:bg-green-500 px-3 py-2 rounded-md transition duration-300 ease-in-out mb-2 md:mb-0 md:mx-1"
      >
        Cart
      </Link>
      <Link
        to={'/'}
        className="text-gray-700 hover:text-white hover:bg-gray-300 p-2 rounded-full transition duration-300 ease-in-out md:ml-1"
      >
        <CgProfile size={20} />
      </Link>
    </div>
  )
}

export default UserActions
