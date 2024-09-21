import React from 'react'
import Layout from '../components/Layout/Layout'
import RestaurantCard from '../components/Restaurants/RestaurantCard'

const restaurants = Array(16).fill({
  name: 'Burger Point',
  description: 'Free Home Delivery 24hrs',
  image: '/images/burger.jpg',
  phone: '+917079268022',
  whatapps: 'https://wa.me/7079268022',
})

const Restaurants = () => (
  <Layout
    title="Restaurants"
    description="KIITMart's Restaurants page offers a comprehensive listing of local eateries available for food delivery. Users can browse through a variety of restaurant options, each featuring menu highlights and free 24-hour home delivery. The page provides a user-friendly interface with easy-to-use 'Call Now' and 'Chat Now' buttons for each restaurant, facilitating quick and convenient food ordering for users."
    keywords="KIITMart, restaurants, food delivery, online ordering, free home delivery, local eateries, campus dining, student meals, food marketplace, menu browsing, call now, chat now, 24-hour delivery, quick service, food options, convenient ordering"
    author="Abhishek Kumar"
  >
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Restaurants</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {restaurants.map((restaurant, index) => (
          <RestaurantCard key={index} restaurant={restaurant} />
        ))}
      </div>
    </div>
  </Layout>
)

export default Restaurants
