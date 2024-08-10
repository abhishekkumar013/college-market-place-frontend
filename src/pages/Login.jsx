import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  return (
    <div className="flex h-screen">
      {/* Left side - Logo */}
      <div className="w-1/2 bg-gray-200 flex items-center justify-center">
        <img src="/images/logo.png" alt="Website Logo" className="max-w-xs" />
      </div>

      {/* Right side - Login */}
      <div className="w-1/2 bg-green-500 flex flex-col items-center justify-center gap-10">
        {/* <div>
          <img className="h-20 w-20 rounded-full" src="/images/kiit.jpg" />
        </div> */}
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Sign in to your kiit account
          </h2>
          <button
            className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center justify-center hover:bg-gray-100 transition duration-300"
            onClick={() => {
              navigate('/')
            }}
          >
            <FcGoogle className="mr-2 text-xl" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
