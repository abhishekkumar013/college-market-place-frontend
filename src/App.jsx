import React, { useEffect, useState } from "react";
import ReactGA from "react-ga";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkUserAuth } from "./store/slices/authSlice.js";
import { getAllProducts } from "./store/slices/productSlice.js";
import { getAllCategory } from "./store/slices/categorySlice.js";

// Components
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Sidebar from "./pages/ProfileSection/Sidebar.jsx";
import PageNotFound from "./components/PageNotFound/PageNotFouund.jsx";
import Loader from "./components/Loaders/Loader.jsx";

// Pages
import Home from "./pages/Home";
import About from "./pages/About.jsx";
import Product from "./pages/Product.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import ProducRequesttList from "./pages/AllRequest.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Cart from "./pages/Cart.jsx";
import OrderHistory from "./components/products/OrderHistory.jsx";
import AddCategory from "./pages/AddCategory.jsx";
import Profile from "./pages/Profile.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";
import MyRequest from "./components/products/MyRequest.jsx";
import MySales from "./components/products/MySales.jsx";
import Myproducut from "./components/products/Myproducut.jsx";
import MyOrder from "./components/products/MyOrder.jsx";
import Restaurants from "./pages/Restaurants.jsx";
import TermsAndConditions from "./pages/TermsAndCondition/TermsAndConditions.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogin, loading, user } = useSelector((state) => state.auth);

  const TRACKING_ID = import.meta.env.VITE_API_TRACKING_ID;

  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
  }, []);

  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isLogin) {
      if (location.pathname === "/login") {
        navigate("/");
      } else {
        dispatch(getAllProducts());
        dispatch(getAllCategory());
      }
    } else {
      if (location.pathname !== "/login") {
        navigate("/login");
      }
    }
  }, [isLogin, location.pathname, navigate, dispatch]);

  const is404Page = location.pathname === "/404";

  console.log(loading);
  console.log("U", user);

  if (loading && !user) {
    return (
      <div className="mt-5 md:h-screen md:flex md:justify-center items-center md:-mt-20">
        <div className="p-8 text-center">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/about-us" element={<About />} />
      <Route path="/product" element={<Product />} />
      <Route path="/product/:id" element={<ProductDetails />} />
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
  );
}

export default App;
