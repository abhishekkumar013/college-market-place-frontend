import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { SearchProducts } from '../../store/slices/productSlice'

const categories = [
  {
    id: '66dc007e1c41cc1541a3c1f8',
    title: 'Laptops',
    image: '/images/laptop.png',
  },
  {
    id: '66dc007e1c41cc1541a3c1f9',
    title: 'Mobiles',
    image: '/images/mobile.png',
  },
  {
    id: '66dc007e1c41cc1541a3c1f7',
    title: 'Charger',
    image: '/images/Charger.png',
  },
  {
    id: '66dc007e1c41cc1541a3c1f6',
    title: 'Headphones',
    image: '/images/headphone5.jpg',
  },
  {
    id: '66dc007e1c41cc1541a3c1f5',
    title: 'Study Materials',
    image: '/images/speaker.png',
  },
]

const ProductCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const displayCount = 1
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === categories.length - displayCount ? 0 : prevIndex + 1,
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swipe left
      nextSlide()
    } else if (touchEndX.current - touchStartX.current > 50) {
      // Swipe right
      prevSlide()
    }
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === categories.length - displayCount ? 0 : prevIndex + 1,
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? categories.length - displayCount : prevIndex - 1,
    )
  }

  const handleCategoryClick = (categoryId) => {
    dispatch(SearchProducts({ categoryId: categoryId.toString() }))
    navigate('/product')
  }

  return (
    <div className="relative w-full max-w-lg mx-auto py-4 px-4 lg:hidden">
      {/* Carousel */}
      <div
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / displayCount)}%)`,
          }}
        >
          {categories.map((category) => (
            <div key={category.id} className={`w-full flex-shrink-0 px-2`}>
              <div
                className="border rounded-lg p-3 shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 bg-white relative flex flex-col items-center cursor-pointer"
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="mb-2 h-32 flex items-center justify-center overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <h2 className="font-bold text-center text-sm">
                  {category.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-2">
        {categories.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full mx-1 ${
              index === currentIndex ? 'bg-black' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductCarousel
