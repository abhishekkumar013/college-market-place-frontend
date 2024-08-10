import { Route, Routes, useLocation, Navigate } from 'react-router-dom'
// import './App.css'

import Home from './pages/Home'
import Header from './components/Header.jsx'
import Login from './pages/Login.jsx'
import About from './pages/About.jsx'
import Footer from './components/Footer.jsx'

function App() {
  const location = useLocation()
  const isAuthenticated = true // Replace this with your actual authentication logic

  return (
    <>
      {location.pathname !== '/login' && <Header />}
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/about-us" element={<About />} />
      </Routes>
      {location.pathname !== '/login' && <Footer />}
    </>
  )
}

export default App
