import React, { useEffect, useState } from 'react'
import PopularCategoryCard from '../components/PopularCategoryCard'
import NewlyAddedCard from '../components/NewlyAddedCard'
import { useDispatch, useSelector } from 'react-redux'
import { checkLoginStatus } from '../store/slices/authSlice'
import { getAllLatestProducts } from '../store/slices/productSlice'
import Layout from '../components/Layout/Layout'
import ProductCarousel from '../components/Crosual/ProductCrosual'
import { Link } from 'react-router-dom'

const categories = [
  {
    id: '66ed051ccd9e701d47729e7e',
    title: 'Clothing & Accessories',
    image: '/images/Clothing_Accessories.png',
  },
  {
    id: '66ed0537cd9e701d47729e87',
    title: 'Electronics',
    image: '/images/Electronics.png',
  },
  {
    id: '66ed0686cd9e701d47729ee2',
    title: 'Study Materials',
    image: '/images/Study_Materials.png',
  },
  {
    id: '66ed0677cd9e701d47729edc',
    title: 'Sports & Fitness',
    image: '/images/Sports_Fitness.png',
  },
  {
    id: '66ed056bcd9e701d47729e93',
    title: 'Food & Beverages',
    image: '/images/Food_Beverages.png',
  },
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
    <Layout
      title="home"
      description="The home page of KIIT Mart offers a user-friendly interface designed to help college students discover and purchase products conveniently. The page prominently features 'Popular Categories' such as Electronics, Clothing & Accessories, Study Materials, Sports & Fitness and Food & Beverages, each represented by visually appealing icons to guide users through different product types. Below, a 'Newly Added' section highlights the latest products with real-time discounts, showcasing items . The top navigation menu provides quick access to key sections such as Buy, Product Listing, Request, Orders, Payment, and History, enhancing the browsing experience. A search bar at the top allows users to find specific products, with an option to filter by categories. The footer includes essential information like copyrights and user-friendly links for further inquiries."
      keywords="KIIT Mart, KIITMart, Kiitmart, kiITMart, KiITMart, KIITMART, kiitMart, kiitmart, KIITmart, kiITMART, KiitMart, kIItMart, kIITMart, kIitMART, kIITmart, KiiTmart, KiiTMART, kIitMART, kIItMART, kIITMART, kIiTmart, KIiTmart, KIiTMart, kIiTMart, marketplace, student shop, campus store, online shopping, quick buy, study materials, clothing, electronics, discounts, fitness, accessories, food, beverages, search bar, product list, buy, request."
      author="Abhishek Kumar"
    >
      {/* Product Carousel */}
      <div className="mb-1 block md:hidden">
        <h2 className="text-2xl text-center font-bold mb-1">
          Popular Categories
        </h2>
        <ProductCarousel products={latestProducts.slice(0, 8)} />
      </div>

      <div className="flex flex-col min-h-screen">
        <div className="flex-grow container mx-auto px-4 py-8 overflow-y-auto scrollbar-hide">
          {/* Popular Categories for Desktop */}
          <div className="hidden md:block">
            <h2 className="text-2xl text-center font-bold mb-4">
              Popular Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.map((category) => (
                <PopularCategoryCard
                  key={category.id}
                  {...category}
                  categoryId={category.id}
                />
              ))}
            </div>
          </div>

          {/* Newly Added Products Section */}
          <div className="mt-8 pb-16 md:pb-0">
            <h2 className="text-2xl text-center font-bold mb-4">Newly Added</h2>
            {latestProducts && latestProducts.length === 0 ? (
              <div className="mt-5  md:flex md:justify-center items-center ">
                <div className="bg-white shadow-md rounded-lg p-8 text-center">
                  <h2 className="text-2xl font-bold mb-4">No Products Found</h2>

                  <p className="text-gray-500 mb-4">
                    It looks like you haven't added any products yet. Start
                    browsing our product listings and add your first item to see
                    it appear here in your cart!
                  </p>

                  <p className="mt-4 text-green-500 hover:underline">
                    <Link to="/product-listing">Add Your Product</Link>
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {latestProducts.map((product, index) => (
                  <NewlyAddedCard key={index} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
