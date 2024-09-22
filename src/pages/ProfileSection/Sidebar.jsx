import React, { useEffect, useState } from 'react'
import UserProfile from './UserProfile'
import MobileNav from './MobileNav'
import { Outlet } from 'react-router-dom'
import { getMyRequest } from '../../store/slices/requestslice'
import { useDispatch } from 'react-redux'
import Layout from '../../components/Layout/Layout'

// App Component
const Sidebar = () => {
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(getMyRequest())
  // }, [])
  const [showsidebar, setShowsidebar] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowsidebar(false)
      } else {
        setShowsidebar(true)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <Layout
      title="Account Details"
      description="The My Profile page of KIITMart displays user account details including name, email, WhatsApp number, and hostel. It features a sidebar menu with options like Account Details, Your Request, Your Sale, Your Product, Review's Order, My Orders, and Help. Users can update their profile information, particularly their hostel details. and The Review Orders page on KIITMart allows users to review orders placed by customers. Users can see order details, including product names, quantities, and buyer information, and take actions such as approving or rejecting orders. The Your's Product page on KIITMart allows users to view and manage the products they have listed for sale. Users can see product details, quantities, and have the option to remove or update their listings. The Your's Request page on KIITMart allows users to add new requests for products by entering the product name and quantity. Users can manage their requests from this page.The Your's Sale page on KIITMart allows users to view the list of products they have sold, including product names, sale dates, and buyer information. Users can manage their sales records from this page."
      keywords="KIITMart,kiitmart,kIITMart,kiitMart,Kiitmart, user profile, account details, personal information, student account, hostel selecton, profile update, sidebar menu, ecommerce account, KIIT University, KIITMart, Review Orders, manage orders, view orders, order details, approve orders, reject orders, KIIT University, KIIT shopping, KIITMart features, Your's Product, manage products, view products, product listings, update products, remove products, KIIT University, KIIT shopping,Your's Request, add request, product request, manage requests, product quantity,Your's Sale, view sales, product sales, manage sales, sale records,"
      author="Abhishek Kumar"
    >
      <div className="flex  flex-col md:flex-row  h-screen 2xl:m-10">
        <div className="w-full md:w-2/6 lg:w-2/6 2xl:w-2/6">
          <UserProfile />
          <MobileNav />
        </div>
        <div className=" w-full  md:w-4/6 lg:w-4/6 2xl:w-4/6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </Layout>
  )
}

export default Sidebar
