import React, { useState } from 'react'
import Logo from './Logo'
import SearchBar from './SearchBar'
import UserActions from './UserActions'
import Navigation from './Navigation'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="font-sans">
      <div className="bg-gray-100 py-3 px-4">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-between">
            <img className="h-9 w-9" src="/images/logo.png" />
            <div className="hidden lg:block flex-grow max-w-3xl mx-4">
              <SearchBar />
            </div>
            <div className="hidden lg:block">
              <UserActions />
            </div>
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              >
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                    />
                  ) : (
                    <path
                      fillRule="evenodd"
                      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
          {isMenuOpen && (
            <div className="mt-4 lg:hidden">
              <SearchBar />
              <UserActions />
            </div>
          )}
        </div>
      </div>
      <Navigation />
    </header>
  )
}

export default Header
