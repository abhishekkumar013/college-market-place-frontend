import React from 'react'
import Footer from '../Footer'
import Header from '../Header'
import { Helmet } from 'react-helmet'
import { useLocation } from 'react-router-dom'
import MobileNavigation from '../NavigationBar/MobileNavigation'

const Layout = ({ children, title, description, keywords, author }) => {
  const location = useLocation()
  const is404Page = location.pathname === '/404'

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>

      {!is404Page && location.pathname !== '/login' && <Header />}

      <main className="flex-grow pb-16 md:pb-0">{children}</main>

      <Footer />

      <div className="fixed bottom-0 left-0 right-0 bg-white md:hidden">
        <MobileNavigation />
      </div>
    </div>
  )
}

Layout.defaultProps = {
  title: 'kiit mart',
  description: 'list your product with kiit mart',
  keywords: 'kiit mart',
  author: 'Abhishek Kumar',
}

export default Layout
