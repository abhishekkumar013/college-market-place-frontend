import React from 'react'
import Login from './Login'
import MobileLogin from './MobileLogin'
import LoginStyle from '../Lunch/LoginStyle'
import MobileLoginStyle from '../Lunch/MobileLoginStyle'

const LoginPage = () => {
  return (
    <div>
      <div className="hidden md:block">
        {/* <Login /> */}
        <LoginStyle />
      </div>
      <div className="md:hidden">
        {/* <MobileLogin /> */}
        <MobileLoginStyle />
      </div>
    </div>
  )
}

export default LoginPage
