import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const FeedBackNotification = () => {
  const [isVisible, setIsVisible] = useState(false)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    const needsFeedback = user.phone

    const hasBeenDismissed =
      localStorage.getItem('feedbackNotificationDismissed') === 'true'

    // Show notification only if user needs to give feedback and hasn't dismissed it before
    setIsVisible(needsFeedback && !hasBeenDismissed)
  }, [user.hasFeedback])

  const handleDismiss = () => {
    setIsVisible(false)
    // Set a flag in localStorage to indicate the notification has been dismissed permanently
    localStorage.setItem('feedbackNotificationDismissed', 'true')
  }

  if (!isVisible) return null

  return (
    <div className="bg-blue-600 text-white py-2 px-4 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center relative">
        <span className="text-center sm:text-left mb-2 sm:mb-0">
          We'd love to hear your feedback! Please take a moment to share your
          thoughts.
        </span>
        <div className="flex items-center">
          <Link
            to="/contact-us"
            className="bg-white text-blue-600 px-4 py-2 rounded font-bold hover:bg-blue-100 transition duration-300 text-sm sm:text-base"
          >
            Give Feedback
          </Link>
          <button
            onClick={handleDismiss}
            className="ml-4 text-white text-2xl hover:text-blue-200"
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  )
}

export default FeedBackNotification
