import React, { useEffect, useState } from 'react'
import MyRequestCard from './MyRequestCard'
import AddNewRequest from '../../pages/AddNewRequest'
import { useDispatch, useSelector } from 'react-redux'
import { getMyRequest } from '../../store/slices/requestslice'
import Loader from '../Loaders/Loader'

const MyRequest = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { myrequest, loading } = useSelector((state) => state.request)
  const [deleteCounter, setDeleteCounter] = useState(false)

  const dispatch = useDispatch()

  const fetchRequest = () => {
    dispatch(getMyRequest())
  }
  useEffect(() => {
    fetchRequest()
  }, [isDialogOpen, deleteCounter])

  const handleRequestDelete = () => {
    setDeleteCounter((prev) => !prev)
  }

  if (loading && myrequest.length == 0 && !isDialogOpen) {
    return (
      <div className="mt-5 md:h-screen md:flex md:justify-center items-center md:-mt-20">
        <div className=" p-8 text-center">
          <Loader />
        </div>
      </div>
    )
  }
  if (myrequest && myrequest.length == 0 && !isDialogOpen) {
    return (
      <div className="mt-5 md:h-screen md:flex md:justify-center items-center md:-mt-20">
        <div className="bg-white shadow-md rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">No request yet</h2>

          <p className="text-gray-500 mb-4">
            You haven't make any request yet. Start requesting to see your
            request history here.
          </p>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full text-sm sm:text-base"
          >
            Add New Request
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Request List</h2>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full text-sm sm:text-base"
        >
          Add New Request
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center font-bold mb-2 px-4 sm:px-6 text-sm sm:text-base">
          <span className="flex-1">Product Name</span>
          <span className="w-20 text-center">Quantity</span>
          <span className="w-20 text-center">Action</span>
        </div>
        <div className="max-h-80 md:max-h-96 2xl:max-h-[700px] overflow-y-auto">
          {myrequest.map((Request) => (
            <MyRequestCard
              key={Request._id}
              Request={Request}
              onDelete={handleRequestDelete}
            />
          ))}
        </div>
      </div>
      <AddNewRequest
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  )
}

export default MyRequest
