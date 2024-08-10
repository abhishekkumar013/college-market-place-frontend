import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
  const [selected, setSelected] = useState(null)
  const menuObject = [
    { id: 1, name: 'Home', url: '/' },
    { id: 2, name: 'Buy', url: '/buy' },
    { id: 3, name: 'Product listing', url: '/product-listing' },
    { id: 4, name: 'Request', url: '/request' },
    { id: 5, name: 'Orders', url: '/orders' },
  ]

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
                } hover:bg-green-600 px-3 py-2 rounded-md text-sm font-medium inline-block`}
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
