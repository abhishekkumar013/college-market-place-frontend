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
  <Layout>
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
