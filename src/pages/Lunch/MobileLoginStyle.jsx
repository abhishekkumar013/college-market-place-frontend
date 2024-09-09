import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { FcGoogle } from 'react-icons/fc'
import { gsap } from 'gsap'

const MobileLoginStyle = () => {
  const navigate = useNavigate()
  const location = useLocation()
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
    const params = new URLSearchParams(location.search)
    const error = params.get('error')
    if (error) {
      setErrorMessage(decodeURIComponent(error))
      alert(error)
    }
    const token = params.get('token')
    if (token) {
      dispatch(loginSuccess({ token: token, user: null }))
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

  if (!showLogin) {
    return (
      <div className="flex h-screen items-center justify-center bg-green-500">
        <h1 className="text-5xl font-bold text-white">
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
    <div className="flex flex-col h-screen bg-white">
      {/* Logo Section */}
      <div className="flex-1 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-green-500 rounded-bl-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-white rounded-full w-48 h-48 flex items-center justify-center">
            <img
              src="/images/logo.png"
              alt="KIIT Mart"
              className="w-36 h-36 object-contain"
            />
          </div>
        </div>
      </div>

      {/* Login Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <h1 className="text-5xl font-bold mb-2">Let's Get</h1>
        <h1 className="text-5xl font-bold mb-8">Started</h1>
        <div className="text-2xl mb-8">• • • •</div>
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-center">
            {errorMessage}
          </div>
        )}
        <button
          className="w-full bg-green-500 text-white py-3 px-4 rounded-full text-lg font-semibold hover:bg-green-600 transition duration-300 flex items-center justify-center"
          onClick={handleLogin}
        >
          <div className="bg-white p-1 rounded-full mr-2">
            <FcGoogle className="text-xl" />
          </div>
          Sign in with Google
        </button>
      </div>
    </div>
  )
}

export default MobileLoginStyle
