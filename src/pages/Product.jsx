import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllProducts,
  clearSearchResults,
  addNewToCart,
  PlacedOrder,
} from '../store/slices/productSlice'
import Loader from '../components/Loaders/Loader'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout/Layout'

const Product = () => {
  const dispatch = useDispatch()
  const { products, searchResults, loading, hasMore } = useSelector(
    (state) => state.product,
  )
  const [currentPage, setCurrentPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)

  useEffect(() => {
    dispatch(getAllProducts(currentPage))
  }, [dispatch, currentPage])

  const displayProducts = searchResults || products

  const handleClearSearch = () => {
    dispatch(clearSearchResults())
  }

  const handleLoadMore = () => {
    if (hasMore) {
      setLoadingMore(true)
      setCurrentPage((prevPage) => prevPage + 1)
      setLoadingMore(false)
    }
  }

  if (loading) {
    return (
      <Layout
        title="product"
        description="The Product page on KIIT Mart offers users a comprehensive view of search results based on their queries. It displays a range of product options, showcasing details such as price, discounts, and product images. Users can easily add items to their cart or proceed directly to purchase with the 'Buy Now' option. The page includes a search bar, sorting options, and filters to help refine search results, making it easy to navigate and find the best deals. The layout is clean, with a focus on user experience and convenience."
        keywords="KIIT Mart, KIITMart, Kiitmart, kiITMart, KiitMart, KIITMART, kiitMART, kiitmart, product page, student marketplace, product search, add to cart, buy now, discounts, online shopping, filter options, sort options, product listing, campus marketplace, search bar, quick buy, Bicycles & Accessories, Clothing & Accessories, College Merchandise, Daily Essentials, Electronics, Exam Prep Tools, Extracurriculars & Hobbies, Events & Club Gear, Food & Beverages, Furniture, Gaming Gear, Gadgets, Health & Wellness, Hostel Supplies, Internship/Placement Essentials, Laptop & Mobile Repairs, Meal Plans & Cooking Essentials, Miscellaneous, Online Courses & Skill-building, Party Supplies, Photography & Videography Gear, Project Supplies, Room Décor, Second-hand Clothing, Second-hand Items, Sports & Fitness, Stationery, Study Materials, Tech & Accessories."
        author="Abhishek Kumar"
      >
        <div className="mt-5 md:h-screen md:flex md:justify-center items-center md:-mt-20">
          <div className="p-8 text-center">
            <Loader />
          </div>
        </div>
      </Layout>
    )
  }

  if (products && products?.length === 0) {
    return (
      <Layout
        title="product"
        description="The Product page on KIIT Mart offers users a comprehensive view of search results based on their queries. It displays a range of product options, showcasing details such as price, discounts, and product images. Users can easily add items to their cart or proceed directly to purchase with the 'Buy Now' option. The page includes a search bar, sorting options, and filters to help refine search results, making it easy to navigate and find the best deals. The layout is clean, with a focus on user experience and convenience."
        keywords="KIIT Mart, KIITMart, Kiitmart, kiITMart, KiitMart, KIITMART, kiitMART, kiitmart, product page, student marketplace, product search, add to cart, buy now, discounts, online shopping, filter options, sort options, product listing, campus marketplace, search bar, quick buy, Bicycles & Accessories, Clothing & Accessories, College Merchandise, Daily Essentials, Electronics, Exam Prep Tools, Extracurriculars & Hobbies, Events & Club Gear, Food & Beverages, Furniture, Gaming Gear, Gadgets, Health & Wellness, Hostel Supplies, Internship/Placement Essentials, Laptop & Mobile Repairs, Meal Plans & Cooking Essentials, Miscellaneous, Online Courses & Skill-building, Party Supplies, Photography & Videography Gear, Project Supplies, Room Décor, Second-hand Clothing, Second-hand Items, Sports & Fitness, Stationery, Study Materials, Tech & Accessories."
        author="Abhishek Kumar"
      >
        <div className="mt-5 md:h-screen md:flex md:justify-center items-center md:-mt-20">
          <div className="bg-white shadow-md rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">No Products Found</h2>

            <p className="text-gray-500 mb-4">
              It looks like you haven't added any products yet. Start browsing
              our product listings and add your first item to see it appear here
              in your cart!
            </p>

            <p className="mt-4 text-green-500 hover:underline">
              <Link to="/product-listing">Add Your Product</Link>
            </p>
          </div>
        </div>
      </Layout>
    )
  }

  const generateProductWhatsAppMessage = (product) => {
    const discount = (
      ((product.mrp - product.finalPrice) / product.mrp) *
      100
    ).toFixed(2)
    const quantity = product.quantity || 1
    const totalPrice = product.finalPrice * quantity

    const message =
      `🛒 Order Details:\n\n` +
      `Product: ${product.name}\n` +
      `Quantity: ${quantity}\n` +
      `Price: ₹${product?.finalPrice}\n` +
      `Total: ₹${totalPrice}\n` +
      `Discount: ${discount}%\n` +
      `MRP: ₹${product.mrp}\n\n` +
      `Seller: ${product.sellerName}`

    return `https://wa.me/91${product?.phone}?text=${encodeURIComponent(
      message,
    )}`
  }

  const handleOrderNow = (product) => {
    const dataobj = {
      seller: product.seller,
      product: product._id,
    }
    dispatch(PlacedOrder(dataobj))

    const link = generateProductWhatsAppMessage(product)
    window.open(link, '_blank')
  }

  return (
    <Layout
      title="product"
      description="The Product page on KIIT Mart offers users a comprehensive view of search results based on their queries. It displays a range of product options, showcasing details such as price, discounts, and product images. Users can easily add items to their cart or proceed directly to purchase with the 'Buy Now' option. The page includes a search bar, sorting options, and filters to help refine search results, making it easy to navigate and find the best deals. The layout is clean, with a focus on user experience and convenience."
      keywords="KIIT Mart, KIITMart, Kiitmart, kiITMart, KiitMart, KIITMART, kiitMART, kiitmart, product page, student marketplace, product search, add to cart, buy now, discounts, online shopping, filter options, sort options, product listing, campus marketplace, search bar, quick buy, Bicycles & Accessories, Clothing & Accessories, College Merchandise, Daily Essentials, Electronics, Exam Prep Tools, Extracurriculars & Hobbies, Events & Club Gear, Food & Beverages, Furniture, Gaming Gear, Gadgets, Health & Wellness, Hostel Supplies, Internship/Placement Essentials, Laptop & Mobile Repairs, Meal Plans & Cooking Essentials, Miscellaneous, Online Courses & Skill-building, Party Supplies, Photography & Videography Gear, Project Supplies, Room Décor, Second-hand Clothing, Second-hand Items, Sports & Fitness, Stationery, Study Materials, Tech & Accessories."
      author="Abhishek Kumar"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-2xl font-bold mb-4 sm:mb-0">
            {searchResults ? 'Search Results' : 'All Products'}
          </h1>
          {searchResults && (
            <button
              onClick={handleClearSearch}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center transition duration-300"
            >
              Clear Search
            </button>
          )}
        </div>

        {displayProducts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xl text-gray-600">No products found.</p>
            {searchResults && (
              <button
                onClick={handleClearSearch}
                className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              >
                View All Products
              </button>
            )}
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {displayProducts.map((product) => (
                <div
                  key={product?._id}
                  className="border rounded-lg p-3 shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 flex flex-col h-auto sm:h-[270px] bg-white group"
                >
                  <div className="mb-2 h-20 sm:h-28 flex items-center justify-center overflow-hidden">
                    <img
                      src={product?.image?.url}
                      alt={product?.name}
                      className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h2 className="font-bold text-center text-md sm:text-base mb-1 truncate group-hover:text-blue-600 transition-colors duration-300">
                    {product?.name}
                  </h2>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-lg sm:text-xl text-green-600 group-hover:text-green-700 transition-colors duration-300">
                      ₹{product?.finalPrice}
                    </span>
                    <span className="text-red-600 text-xs sm:text-sm font-semibold">
                      {product?.discount}% off
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs sm:text-sm line-through">
                    M.R.P: ₹{product?.mrp}
                  </p>
                  <div className="mt-2 flex flex-col sm:flex-row w-full space-y-2 sm:space-y-0 sm:space-x-2">
                    {product.isSold ? (
                      <button
                        disabled
                        className="flex-1 bg-red-500 text-white py-1.5 px-2 rounded-full text-center text-xs sm:text-sm cursor-not-allowed"
                      >
                        Sold Out
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => dispatch(addNewToCart(product))}
                          className="flex-1 bg-green-500 text-white py-1.5 px-2 rounded-full hover:bg-green-600 transition-all duration-300 text-xs sm:text-sm hover:shadow-md"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => handleOrderNow(product)}
                          className="flex-1 bg-green-600 text-white py-1.5 px-2 rounded-full hover:bg-green-700 transition-all duration-300 text-xs sm:text-sm hover:shadow-md"
                        >
                          Buy Now
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {hasMore && (
              <div className="text-center mt-4">
                <button
                  onClick={handleLoadMore}
                  className={`bg-green-800 hover:bg-green-900 text-white py-2 px-4 rounded transition duration-300 ease-in-out ${
                    loadingMore ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={loadingMore}
                >
                  {loadingMore ? 'Loading...' : 'Load More..'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Product
