import React, { useEffect, useState } from 'react'
import PopularCategoryCard from '../components/PopularCategoryCard'
import NewlyAddedCard from '../components/NewlyAddedCard'
import { useDispatch, useSelector } from 'react-redux'
import { checkLoginStatus } from '../store/slices/authSlice'
import { getAllLatestProducts } from '../store/slices/productSlice'
import Layout from '../components/Layout/Layout'
import ProductCarousel from '../components/Crosual/ProductCrosual'

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
      description="The home page of KIIT Mart offers a user-friendly interface designed to help college students discover and purchase products conveniently. The page prominently features 'Popular Categories' such as Electronics, Clothing & Accessories, Study Materials, Sports & Fitness and Food & Beverages, each represented by visually appealing icons to guide users through different product types. Below, a 'Newly Added' section highlights the latest products with real-time discounts, showcasing items like cameras, shoes, portable speakers, umbrellas, and more. The top navigation menu provides quick access to key sections such as Buy, Product Listing, Request, Orders, Payment, and History, enhancing the browsing experience. A search bar at the top allows users to find specific products, with an option to filter by categories. The footer includes essential information like copyrights and user-friendly links for further inquiries."
      keywords="KIIT Mart, home page, student marketplace, popular categories, laptops, mobiles, cables, headphones, study materials, newly added products, discounts, Canon camera, Campus shoes, JBL Go 3, umbrella, cable protectors, online shopping, search bar, product listing, easy navigation"
      author="Abhishek Kumar"
    >
      {/* Product Carousel */}
      <div className="mb-1 block md:hidden">
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
