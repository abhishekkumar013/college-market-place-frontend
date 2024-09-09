import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { server } from '../../main'
import { toast } from 'react-toastify'

const initialState = {
  categories: [],
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    addCategory(state, action) {
      state.categories = action.payload
    },
  },
})
export const { addCategory } = categorySlice.actions

export default categorySlice.reducer

export const addNewCategory = (data) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth
    try {
      const response = await axios.post(
        `${server}/category/add`,
        { name: data },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      // console.log(response)
      toast.success(response?.data?.message)
      //   dispatch(addCategory(response.data))
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
}

export const getAllCategory = () => {
  return async (dispatch, getState) => {
    const { token } = getState().auth
    try {
      const { data } = await axios.get(`${server}/category/get-all`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      dispatch(addCategory(data.data))
    } catch (error) {
      console.log(error)
    }
  }
}
