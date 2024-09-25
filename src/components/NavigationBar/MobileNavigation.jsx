import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Tag, Home, User, ShoppingCart } from 'lucide-react'
import { useSelector } from 'react-redux'

const MobileNavigation = () => {
  const location = useLocation()
  const { cart } = useSelector((state) => state.product)

  const navItems = [
    { icon: ShoppingBag, label: 'Buy', path: '/product' },
    { icon: Tag, label: 'Sell', path: '/product-listing' },
    { icon: Home, label: 'Home', path: '/' },
    { icon: User, label: 'Request', path: '/all-request' },
    { icon: ShoppingCart, label: 'Cart', path: '/cart' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe lg:hidden">
      <div className="flex justify-between items-center px-2 py-1">
        {navItems?.map((item) => {
          const IconComponent = item.icon
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.label}
              to={item.path}
              className="flex flex-col items-center relative flex-grow"
            >
              <div className="p-1 relative w-10 h-10 flex items-center justify-center">
                <div
                  className={`absolute inset-0 bg-green-500 rounded-full transition-all duration-300 ease-in-out ${
                    isActive ? 'scale-110 opacity-100' : 'scale-50 opacity-0'
                  }`}
                ></div>
                <IconComponent
                  size={20}
                  className={`transition-all duration-300 ease-in-out ${
                    isActive
                      ? 'text-white scale-125'
                      : 'text-gray-600 scale-100'
                  }`}
                />
                {item?.label === 'Cart' && cart?.length > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cart?.length}
                  </div>
                )}
              </div>
              <span
                className={`text-xs mt-0.5 transition-all duration-300 ease-in-out ${
                  isActive ? 'text-green-500' : 'text-gray-600'
                }`}
              >
                {item?.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default MobileNavigation
