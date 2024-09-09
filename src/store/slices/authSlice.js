import { createSlice } from '@reduxjs/toolkit'
import { server } from '../../main'
import axios from 'axios'
import { toast } from 'react-toastify'

const initialState = {
  isLogin: localStorage.getItem('isLogin') === 'true' || false,
  user: (() => {
    const storedUser = localStorage.getItem('user')
    return storedUser && storedUser !== 'undefined'
      ? JSON.parse(storedUser)
      : null
  })(),
  message: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isLogin = true
      state.user = action.payload
      localStorage.setItem('isLogin', 'true')
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    loginFailed(state) {
      state.isLogin = false
      state.user = null
      localStorage.setItem('isLogin', 'false')
      localStorage.removeItem('user')
    },
    logoutSuccess(state) {
      state.isLogin = false
      state.user = null
      localStorage.setItem('isLogin', 'false')
      localStorage.removeItem('user')
    },
  },
})

export const {
  loginSuccess,
  loginFailed,
  logoutSuccess,
  updateProfileSuccess,
} = authSlice.actions

export default authSlice.reducer

export const checkLoginStatus = () => async (dispatch) => {
  const user = localStorage.getItem('user')

  if (user) {
    dispatch(loginSuccess(JSON.parse(user)))
  } else {
    try {
      // Call backend to check if the session is still valid
      const { data } = await axios.get(`${server}/user/login/success`, {
        withCredentials: true,
      })
      console.log(data)

      if (data && data.user) {
        // Successfully retrieved user data, set as logged in
        dispatch(loginSuccess(data.user))
      } else {
        // No user data, treat as not logged in
        dispatch(loginFailed())
      }
    } catch (error) {
      // Failed to retrieve session, treat as not logged in
      dispatch(loginFailed())
    }
  }
}

export const logoutUser = () => async (dispatch) => {
  try {
    await axios.get(`${server}/user/logout`, {
      withCredentials: true,
    })

    dispatch(logoutSuccess())
    toast.success('Logged out successfully')
  } catch (error) {
    toast.error('Error logging out')
    dispatch(logoutSuccess())
  }
}

export const updateUserProfile = (userData) => async (dispatch, getState) => {
  try {
    // const { token } = getState().auth
    const { data } = await axios.put(
      `${server}/user/update-profile`,
      userData,
      {
        withCredentials: true,
      },
    )

    if (data.success) {
      toast.success(data.message)
      dispatch(updateProfileSuccess(data.data))
      dispatch(checkLoginStatus())
    } else {
      toast.error(data.message)
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message
    toast.error(errorMessage)
  }
}
