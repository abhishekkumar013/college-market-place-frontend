import React, { useEffect, useState, useRef } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { gsap } from 'gsap'
import { loginSuccess } from '../../store/slices/authSlice'
import { toast } from 'react-toastify'

const LoginStyle = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [errorMessage, setErrorMessage] = useState(null)
  const [showLogin, setShowLogin] = useState(false)
  const [isTermsOpen, setIsTermsOpen] = useState(false)
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
      // alert(error)
      toast.warn(error)
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

  const termsAndConditions = [
    "Welcome to KIIT Mart! By diving into our marketplace, you're agreeing to play by our rules.",
    'Your info matters! We use your contact details to connect with you and ensure smooth communication with other students.',
    "Let's keep it safe! Alcohol, weapons, and other forbidden items are a no-go here.",
    'Sellers, step up! Make sure your product listings are spot-on; your reputation is on the line.',
    'Transactions made easy! Remember, all payments happen directly between you and the seller—KIIT Mart is just the bridge!',
    "Refunds and returns? Those are between you and your seller; we're here to facilitate, not mediate!",
    'Respect the community! Harassment and fraud have no place in our marketplace.',
    "Quality alert! While we connect buyers and sellers, we can't guarantee the quality of every product.",
    "Stay in check! We reserve the right to suspend or terminate accounts that don't follow the rules.",
    'Open communication! We ensure that all interactions between buyers and sellers remain seamless and secure for a better shopping experience!',
  ]

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
            Sign in with your KIIT account
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
          <p className="mt-4 text-sm text-gray-600 text-center">
            By clicking on Sign in, I accept the{' '}
            <button
              className="text-blue-500 hover:underline"
              onClick={() => setIsTermsOpen(true)}
            >
              Terms & Conditions & Privacy Policy
            </button>
          </p>
        </div>
      </div>

      {/* Custom Modal for Terms & Conditions */}
      {isTermsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Terms & Conditions</h2>
            <ul className="list-disc pl-5 space-y-2">
              {termsAndConditions.map((term, index) => (
                <li key={index}>{term}</li>
              ))}
            </ul>
            <button
              className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={() => setIsTermsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default LoginStyle
