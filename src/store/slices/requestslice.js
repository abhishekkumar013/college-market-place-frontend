import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
import { server } from '../../main'

const initialState = {
  allrequest: [],
  myrequest: [],
  loading: false,
  error: null,
  message: '',
}

const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload
    },
    setMessage(state, action) {
      state.message = action.payload
    },
    setError(state, action) {
      state.error = action.payload
    },
    addAllrequest(state, action) {
      state.allrequest = action.payload
    },
    addMyrequest(state, action) {
      state.myrequest = action.payload
    },
    clearMessage(state) {
      state.message = ''
      state.error = null
    },
  },
})

export const {
  addAllrequest,
  addMyrequest,
  setLoading,
  setError,
  setMessage,
  clearMessage,
} = requestSlice.actions

export default requestSlice.reducer

export const getAllRequest = () => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true))
    dispatch(clearMessage())
    const { token } = getState().auth
    try {
      const { data } = await axios.get(`${server}/request/get-all`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (data.success) {
        dispatch(addAllrequest(data.data))
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message || 'Error in fetching request')
    } finally {
      console.log('set loading false')
      dispatch(setLoading(false))
    }
  }
}

export const getMyRequest = () => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true))
    dispatch(clearMessage())
    const { token } = getState().auth
    try {
      const { data } = await axios.get(`${server}/request/get-user`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (data.success) {
        dispatch(addMyrequest(data.data))
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message || 'Error in fetching request')
    } finally {
      dispatch(setLoading(false))
    }
  }
}
export const deleteMyRequest = (id) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true))
    dispatch(clearMessage())
    const token = localStorage.getItem('token')
    try {
      const { data } = await axios.delete(`${server}/request/delete/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (data.success) {
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message || 'Error in deleting request')
    } finally {
      dispatch(setLoading(false))
    }
  }
}
