import React from 'react'
import { useDispatch } from 'react-redux'
import {
  deleteMyRequest,
  getAllRequest,
  getMyRequest,
} from '../../store/slices/requestslice'
import { toast } from 'react-toastify'

const MyRequestCard = ({ Request, onDelete }) => {
  const dispatch = useDispatch()

  const handleDelete = async () => {
    dispatch(deleteMyRequest(Request._id))
    dispatch(getMyRequest())
    onDelete()
  }

  return (
    <div className="bg-gray-200 rounded-full py-3 px-4 sm:px-6 mb-2 flex items-center text-sm sm:text-base">
      <span className="flex-1">{Request?.name}</span>
      <span className="w-20 text-center">{Request?.quantity}</span>
      <button
        onClick={handleDelete}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-full text-xs sm:text-sm ml-4"
      >
        Delete
      </button>
    </div>
  )
}

export default MyRequestCard
