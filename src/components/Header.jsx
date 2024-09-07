import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Logo from './Logo'
import SearchBar from './SearchBar'
import UserActions from './UserActions'
import Navigation from './Navigation'
import PhoneUpdateNotification from './Notifaction/PhoneUpdate'
import { Menu, X, Search, User } from 'lucide-react'
import MobileUserActions from './UserActionAll/MobileUserAction'

const Header = () => {
  const [openMenu, setOpenMenu] = useState(null)
  const { user } = useSelector((state) => state.auth)

  const toggleMenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName)
  }

  return (
    <>
      <header className="font-sans fixed top-0 left-0 right-0 z-50">
        <div className="bg-gray-100 py-3 px-4 shadow-md">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <Link to={'/'} className="flex items-center">
                <img
                  className="h-10 w-10 mr-2"
                  src="/images/logo.png"
                  alt="Logo"
                />
              </Link>
              <div className="hidden lg:block flex-grow max-w-3xl mx-4">
                <SearchBar />
              </div>
              <div className="hidden lg:block">
                <UserActions />
              </div>

              {/* Mobile icons */}
              <div className="flex items-center lg:hidden space-x-4">
                {/* Search Icon */}
                <button
                  onClick={() => toggleMenu('search')}
                  className="text-gray-500 hover:text-gray-600 focus:outline-none"
                >
                  <Search size={24} />
                </button>
                {/* Menu Toggle Button */}
                <button
                  onClick={() => toggleMenu('menu')}
                  className="text-gray-500 hover:text-gray-600 focus:outline-none"
                >
                  {openMenu === 'menu' ? <X size={24} /> : <Menu size={24} />}
                </button>
                <div className="relative">
                  <Link
                    to={'/profile'}
                    className="flex items-center text-gray-500 hover:text-gray-600 focus:outline-none"
                  >
                    <img
                      src={user?.image}
                      alt="Profile"
                      className="h-8 w-8 rounded-full border border-gray-300"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile search bar */}
        {openMenu === 'search' && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="container mx-auto px-4 py-2">
              <SearchBar />
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {openMenu === 'menu' && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="container mx-auto px-4 py-2">
              <UserActions />
              <MobileUserActions />
            </div>
          </div>
        )}

        {/* Phone Update Notification */}
        {user && !user?.phone && <PhoneUpdateNotification />}

        {/* Navigation - hidden on mobile */}
        <div className="hidden lg:block">
          <Navigation />
        </div>
      </header>
      {/* Spacer to prevent content from being hidden under the fixed header */}
      <div
        className={`${user && !user.phone ? 'h-32 lg:h-40' : 'h-20 lg:h-28'}`}
      ></div>
    </>
  )
}

export default Header
