import React, { useEffect, useState, useRef } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { gsap } from 'gsap'
import { loginSuccess } from '../../store/slices/authSlice'

const LoginStyle = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [errorMessage, setErrorMessage] = useState(null)
  const [showLogin, setShowLogin] = useState(false)
  const charactersRef = useRef([])

  useEffect(() => {
    const characters = charactersRef.current
    const tl = gsap.timeline({ onComplete: () => setShowLogin(true) })

    // Ensure all characters start invisible
    gsap.set(characters, { opacity: 0, y: 50 })

    // Animate each character
    characters.forEach((char, index) => {
      tl.to(
        char,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'back.out(1.7)',
        },
        index * 0.1,
      ) // Stagger the start time
    })

    // Hold for a moment
    tl.to({}, { duration: 0.5 })

    // Fade out all characters
    tl.to(characters, {
      opacity: 0,
      y: -50,
      duration: 0.5,
      stagger: 0.05,
    })
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const error = params.get('error')
    if (error) {
      setErrorMessage(decodeURIComponent(error))
      alert(error)
    }
  }, [])

  const handleLogin = () => {
    setErrorMessage(null)
    const url =
      import.meta.env.VITE_API_ENV === 'production'
        ? import.meta.env.VITE_API_LOGIN_DEPLOY
        : import.meta.env.VITE_API_LOGIN_LOCAL
    window.open(url, '_self')
  }

  if (!showLogin) {
    return (
      <div className="flex h-screen items-center justify-center bg-green-500">
        <h1 className="text-6xl lg:text-9xl font-bold text-white">
          {'KIIT Mart'.split('').map((char, index) => (
            <span
              key={index}
              ref={(el) => (charactersRef.current[index] = el)}
              className="inline-block"
            >
              {char}
            </span>
          ))}
        </h1>
      </div>
    )
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
            Sign in to your KIIT account
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

export default LoginStyle
