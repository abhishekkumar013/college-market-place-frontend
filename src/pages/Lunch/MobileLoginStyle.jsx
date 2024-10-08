import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { FcGoogle } from 'react-icons/fc'
import { gsap } from 'gsap'
import { loginSuccess } from '../../store/slices/authSlice'
import { toast } from 'react-toastify'

const MobileLoginStyle = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const [errorMessage, setErrorMessage] = useState(null)
  const [showLogin, setShowLogin] = useState(false)
  const [isTermsOpen, setIsTermsOpen] = useState(false)
  const charactersRef = useRef([])

  useEffect(() => {
    const characters = charactersRef.current
    const tl = gsap.timeline({ onComplete: () => setShowLogin(true) })

    gsap.set(characters, { opacity: 0, y: 50 })

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
      )
    })

    tl.to({}, { duration: 0.5 })

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
      // alert(error)
      toast.warn(error)
    }
    const token = params.get('token')
    if (token) {
      dispatch(loginSuccess({ token: token, user: null }))
    }
  }, [location, dispatch])

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

      {/* Custom Modal for Terms & Conditions */}
      {isTermsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-4 w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Terms & Conditions</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              {termsAndConditions.map((term, index) => (
                <li key={index}>{term}</li>
              ))}
            </ul>
            <button
              className="mt-6 w-full bg-green-500 text-white py-2 px-4 rounded-full text-lg font-semibold hover:bg-green-600 transition duration-300"
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

export default MobileLoginStyle
