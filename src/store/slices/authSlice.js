import { createSlice } from '@reduxjs/toolkit'
import { server } from '../../main'
import axios from 'axios'
import { toast } from 'react-toastify'

const initialState = {
  isLogin: localStorage.getItem('isLogin') === 'true' || false,
  token: localStorage.getItem('token') || null,
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
      state.token = action.payload.token
      state.user = action.payload.user
      localStorage.setItem('isLogin', 'true')
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('user', JSON.stringify(action.payload.user))
    },
    loginFailed(state, action) {
      state.isLogin = false
      state.token = null
      state.user = null
      localStorage.setItem('isLogin', 'false')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    logoutSuccess(state) {
      state.isLogin = false
      state.token = null
      state.user = null
      localStorage.setItem('isLogin', 'false')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('hasMore')
    },
    updateProfileSuccess(state, action) {
      state.user = action.payload
      localStorage.removeItem('user')
      localStorage.setItem('user', JSON.stringify(action.payload))
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
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')

  if (token && user) {
    dispatch(loginSuccess({ token, user: JSON.parse(user) }))
  } else {
    try {
      console.log('Calling  login sucess')
      const { data } = await axios.get(`${server}/user/login/success`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const { user } = data
      console.log('login user', user)

      dispatch(loginSuccess(user))
    } catch (error) {
      console.log('login error', error.response?.data?.message)
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
    const { token } = getState().auth
    console.log(token)
    const { data } = await axios.put(
      `${server}/user/update-profile`,
      userData,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    console.log(data)

    if (data.success) {
      toast.success(data.message)
      dispatch(updateProfileSuccess(data.data))
    } else {
      toast.error(data.message)
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message
    console.error(errorMessage)
    toast.error(errorMessage)
  }
}
