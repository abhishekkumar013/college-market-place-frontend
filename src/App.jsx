import React, { useEffect } from 'react'
import ReactGA from 'react-ga'
import { Helmet } from 'react-helmet'
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkLoginStatus } from './store/slices/authSlice.js'
import { getAllMyProduct, getAllProducts } from './store/slices/productSlice.js'

// Components
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Sidebar from './pages/ProfileSection/Sidebar.jsx'
import PageNotFound from './components/PageNotFound/PageNotFouund.jsx'

// Pages
import Home from './pages/Home'
import About from './pages/About.jsx'
import Product from './pages/Product.jsx'
import AddProduct from './pages/AddProduct.jsx'
import ProducRequesttList from './pages/AllRequest.jsx'
import ContactUs from './pages/ContactUs.jsx'
import Cart from './pages/Cart.jsx'
import OrderHistory from './components/products/OrderHistory.jsx'
import AddCategory from './pages/AddCategory.jsx'
import Profile from './pages/Profile.jsx'
import LoginPage from './pages/Login/LoginPage.jsx'
import MyRequest from './components/products/MyRequest.jsx'
import MySales from './components/products/MySales.jsx'
import Myproducut from './components/products/Myproducut.jsx'
import { getAllCategory } from './store/slices/categorySlice.js'
import MyOrder from './components/products/MyOrder.jsx'
import Restaurants from './pages/Restaurants.jsx'
import TermsAndConditions from './pages/TermsAndCondition/TermsAndConditions.jsx'

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isLogin } = useSelector((state) => state.auth)
  const TRACKING_ID = import.meta.env.VITE_API_TRACKING_ID

  useEffect(() => {
    ReactGA.initialize(TRACKING_ID)
  }, [])
  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search)
  }, [location])

  useEffect(() => {
    dispatch(checkLoginStatus())
  }, [dispatch, location, navigate, isLogin])

  useEffect(() => {
    // Redirect based on login status

    if (isLogin) {
      if (location.pathname === '/login') {
        navigate('/')
      }
    } else if (location.pathname !== '/login') {
      navigate('/login')
    }
  }, [isLogin, location.pathname, navigate])

  useEffect(() => {
    dispatch(getAllProducts())
    dispatch(getAllCategory())
  })

  // Check if the current route is the 404 page
  const is404Page = location.pathname === '/404'

  return (
    // <div className="flex flex-col min-h-screen">
    //   {!is404Page && location.pathname !== '/login' && <Header />}
    //   <div className="flex-grow">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/about-us" element={<About />} />
      <Route path="/product" element={<Product />} />
      <Route path="/product-listing" element={<AddProduct />} />
      <Route path="/all-request" element={<ProducRequesttList />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/orders" element={<OrderHistory />} />
      <Route path="/category" element={<AddCategory />} />
      <Route path="/restaurants" element={<Restaurants />} />
      <Route path="/rules" element={<TermsAndConditions />} />
      <Route path="/profile" element={<Sidebar />}>
        <Route index element={<Profile />} />
        <Route path="/profile/request" element={<MyRequest />} />
        <Route path="/profile/sales" element={<MySales />} />
        <Route path="/profile/product" element={<Myproducut />} />
        <Route path="/profile/review-orders" element={<OrderHistory />} />
        <Route path="/profile/my-orders" element={<MyOrder />} />
      </Route>
      <Route path="/404" element={<PageNotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
    //   </div>
    //   {!is404Page && location.pathname !== '/login' && <Footer />}
    // </div>
  )
}

export default App
