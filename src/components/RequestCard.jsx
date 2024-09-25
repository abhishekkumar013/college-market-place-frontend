import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5'

const RequestCard = ({ Request }) => {
  const handleOrderNow = () => {
    const link = `https://wa.me/91${Request?.user?.phone}`
    window.open(link, '_blank')
  }

  return (
    <div className="bg-gray-200 rounded-full py-3 px-4 sm:px-6 mb-2 flex items-center text-sm sm:text-base">
      <span className="flex-1">{Request?.name}</span>
      <span className="w-20 text-center">{Request?.quantity}</span>
      <button
        onClick={handleOrderNow}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded-full text-xs sm:text-sm ml-4 flex items-center"
      >
        <IoChatbubbleEllipsesOutline className="mr-1" />
        Chat
      </button>
    </div>
  )
}

export default RequestCard
