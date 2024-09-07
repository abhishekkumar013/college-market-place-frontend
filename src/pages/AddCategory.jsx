import axios from 'axios'
import React, { useState } from 'react'

import { server } from '../main'
import Layout from '../components/Layout/Layout'
import { useDispatch } from 'react-redux'
import { addNewCategory } from '../store/slices/categorySlice'
import { toast } from 'react-toastify'

const AddCategory = () => {
  const [name, setName] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (name) {
      dispatch(addNewCategory(name))
    } else {
      toast.error('Muust give name')
    }

    setName('')
  }

  return (
    <Layout title="home" description="" keywords="" author="">
      <div className="flex flex-col gap-10 items-center justify-center mt-5">
        <h1 className="font-bold text-3xl">Add New Category</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="categoryName">Name</label>
            <input
              id="categoryName"
              className="border p-2 rounded"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default AddCategory
