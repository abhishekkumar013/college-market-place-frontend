import React, { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const categories = [
  { id: 1, title: 'Laptops', image: '/images/laptop.png' },
  { id: 2, title: 'Mobiles', image: '/images/mobile.png' },
  { id: 3, title: 'Charger', image: '/images/Charger.png' },
  { id: 4, title: 'Headphones', image: '/images/headphone5.jpg' },
  { id: 5, title: 'Study Materials', image: '/images/speaker.png' },
]

const ProductCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const displayCount = 1
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

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

  return (
    <div
      className="relative w-full max-w-lg mx-auto py-8 px-4 lg:hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / displayCount)}%)`,
          }}
        >
          {categories.map((product) => (
            <div key={product.id} className={`w-full flex-shrink-0 px-2`}>
              <div className="border rounded-lg p-4 shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 bg-white relative flex flex-col items-center">
                <div className="mb-4 h-48 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                <h2 className="font-bold text-center text-lg mb-2">
                  {product.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Navigation Buttons */}
      {/* <button
        onClick={prevSlide}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-all"
      >
        <ChevronLeft className="w-6 h-6 text-gray-600" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-all"
      >
        <ChevronRight className="w-6 h-6 text-gray-600" />
      </button> */}
      {/* Pagination Dots */}
      <div className="flex justify-center mt-4">
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
