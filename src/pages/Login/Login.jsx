import React, { useEffect, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const [errorMessage, setErrorMessage] = useState(null)

  const handleSuccessfulLogin = () => {
    const from = location.state?.from || '/'
    navigate(from, { replace: true })
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const error = params.get('error')
    if (error) {
      setErrorMessage(decodeURIComponent(error))
      alert(error)
    }
  }, [location])

  const handleLogin = () => {
    setErrorMessage(null)

    const url =
      import.meta.env.VITE_API_ENV === 'production'
        ? import.meta.env.VITE_API_LOGIN_DEPLOY
        : import.meta.env.VITE_API_LOGIN_LOCAL
    window.open(url, '_self')
  }

  return (
    <div className="flex h-screen">
      {/* Left side - Logo */}
      <div className="w-1/2 bg-gray-200 flex items-center justify-center">
        <img src="/images/logo.png" alt="Website Logo" className="max-w-xs" />
      </div>

      {/* Right side - Login */}
      <div className="w-1/2 bg-green-500 flex flex-col items-center justify-center gap-10">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Sign in to your kiit account
          </h2>
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-center">
              {errorMessage}
            </div>
          )}
          <button
            className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center justify-center hover:bg-gray-100 transition duration-300"
            onClick={handleLogin}
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
