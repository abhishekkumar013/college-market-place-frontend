import React, { useEffect, useState } from 'react'
import PopularCategoryCard from '../components/PopularCategoryCard'
import NewlyAddedCard from '../components/NewlyAddedCard'

import { useDispatch, useSelector } from 'react-redux'
import { checkLoginStatus } from '../store/slices/authSlice'
import { getAllLatestProducts } from '../store/slices/productSlice'
import Layout from '../components/Layout/Layout'
import ProductCarousel from '../components/Crosual/ProductCrosual'

const categories = [
  { title: 'Laptops', image: '/images/laptop.png' },
  { title: 'Mobiles', image: '/images/mobile.png' },
  { title: 'Charger', image: '/images/Charger.png' },
  { title: 'Headphones', image: '/images/headphone5.jpg' },
  { title: 'Study Materials', image: '/images/speaker.png' },
]

const Home = () => {
  const dispatch = useDispatch()
  const [showCategories, setShowCategories] = useState(true)

  const { latestProducts } = useSelector((state) => state.product)

  useEffect(() => {
    dispatch(getAllLatestProducts())
    dispatch(checkLoginStatus())
  }, [dispatch])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 550) {
        setShowCategories(false)
      } else {
        setShowCategories(true)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Layout title="home" description="" keywords="" author="">
      {/* Product Carousel */}
      <div className="mb-8">
        <ProductCarousel products={latestProducts.slice(0, 8)} />
      </div>

      <div className="flex flex-col min-h-screen">
        <div className="flex-grow container mx-auto px-4 py-8 overflow-y-auto scrollbar-hide">
          {/* Popular Categories for Mobile */}
          {/* <div className="block md:hidden mb-8">
            {showCategories ? (
              <div>
                <h2 className="text-2xl text-center font-bold mb-4">
                  Categories
                </h2>
                <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-20 flex flex-col items-center"
                    >
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                        <img
                          src={category.image}
                          alt={category.title}
                          className="w-8 h-8"
                        />
                      </div>
                      <span className="text-sm text-center">
                        {category.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-4 bg-gray-100 rounded-md">
                <p className="text-lg font-semibold">
                  Discover our amazing products!
                </p>
              </div>
            )}
          </div> */}

          {/* Popular Categories for Desktop */}
          <div className="hidden md:block">
            <h2 className="text-2xl text-center font-bold mb-4">
              Popular Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.map((category, index) => (
                <PopularCategoryCard key={index} {...category} />
              ))}
            </div>
          </div>

          {/* Newly Added Products Section */}
          <div className="mt-8 pb-16 md:pb-0">
            <h2 className="text-2xl text-center font-bold mb-4">Newly Added</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {latestProducts.map((product, index) => (
                <NewlyAddedCard key={index} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
