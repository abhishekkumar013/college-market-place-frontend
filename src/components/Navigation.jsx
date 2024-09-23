import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
  const [selected, setSelected] = useState(null)
  const menuObject = [
    { id: 1, name: 'Home', url: '/' },
    { id: 2, name: 'Products', url: '/product' },
    { id: 3, name: 'Sell', url: '/product-listing' },
    { id: 4, name: 'Product Request', url: '/all-request' },
    // { id: 5, name: 'Restaurants', url: '/restaurants' },
    // { id: 6, name: 'Category', url: '/category' },
  ]
  useEffect(() => {
    // Update selected state based on the current location
    const currentPath = location.pathname
    const currentItem = menuObject.find((item) => item.url === currentPath)
    setSelected(currentItem?.id || null)
  }, [location.pathname])

  return (
    <nav className="bg-green-500 py-2">
      <div className="container mx-auto px-4">
        <ul className="flex flex-wrap justify-center gap-2">
          {menuObject.map((item) => (
            <li key={item.id} className="flex-shrink-0">
              <Link
                onClick={() => setSelected(item.id)}
                to={item.url}
                className={`text-white ${
                  selected === item.id && 'bg-green-600'
                } hover:bg-green-600 px-3 py-2 rounded-md text-md font-medium inline-block`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
