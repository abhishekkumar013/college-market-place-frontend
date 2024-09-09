import React from 'react'
import './index.css'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider } from '@mui/material'

import theme from './theme.js'

export const server =
  import.meta.env.VITE_API_ENV === 'production'
    ? import.meta.env.VITE_API_Deploy_Bacakend
    : import.meta.env.VITE_API_Local_Backend

console.log(server)
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
        <ToastContainer />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>,
)
