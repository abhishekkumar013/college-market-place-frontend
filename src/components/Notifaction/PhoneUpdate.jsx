import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const PhoneUpdateNotification = () => {
  const [isVisible, setIsVisible] = useState(false)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    const needsPhoneUpdate = !user.phone

    const hasBeenDismissed =
      localStorage.getItem('phoneUpdateNotificationDismissed') === 'true'

    // Show notification only if user needs to update phone and hasn't dismissed it before
    setIsVisible(needsPhoneUpdate && !hasBeenDismissed)
  }, [user.phone])

  const handleDismiss = () => {
    setIsVisible(false)
    // Set a flag in localStorage to indicate the notification has been dismissed
    localStorage.setItem('phoneUpdateNotificationDismissed', 'true')
  }

  if (!isVisible) return null

  return (
    <div className="bg-red-600 text-white py-2 px-4 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center relative">
        <span className="text-center sm:text-left mb-2 sm:mb-0">
          Please update your phone number in your profile section.
        </span>
        <div className="flex items-center">
          <Link
            to="/profile"
            className="bg-white text-red-600 px-4 py-2 rounded font-bold hover:bg-red-100 transition duration-300 text-sm sm:text-base"
          >
            Update Now
          </Link>
          {/* <button
            onClick={handleDismiss}
            className="ml-4 text-white text-2xl hover:text-red-200"
            aria-label="Close notification"
          >
            ×
          </button> */}
        </div>
      </div>
    </div>
  )
}

export default PhoneUpdateNotification
