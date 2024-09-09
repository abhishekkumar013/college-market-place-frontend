import React from 'react'
import { MessageSquare, Phone } from 'lucide-react'
const RestaurantCard = ({ restaurant }) => (
  <div className="border rounded-lg p-3 shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 flex flex-col h-auto sm:h-[250px] bg-white group">
    <div className="mb-2 h-24 sm:h-32 flex items-center justify-center overflow-hidden">
      <img
        src={restaurant.image}
        alt={restaurant.name}
        className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
      />
    </div>
    <h2 className="font-bold text-center text-sm sm:text-base mb-1 truncate group-hover:text-blue-600 transition-colors duration-300">
      {restaurant.name}
    </h2>
    <p className="text-gray-600 text-xs sm:text-sm mb-2 text-center">
      {restaurant.description}
    </p>
    <div className="mt-auto flex flex-col sm:flex-row w-full space-y-2 sm:space-y-0 sm:space-x-2">
      <a
        href={`tel:${restaurant.phone}`}
        className="flex-1 bg-[#00b300] text-white py-1.5 px-2 rounded-full hover:bg-[#009900] transition-all duration-300 text-xs sm:text-sm hover:shadow-md flex items-center justify-center"
      >
        <Phone size={14} className="mr-1 sm:mr-2" />
        Call Now
      </a>
      <a
        href={restaurant.whatapps}
        target="_blank"
        className="flex-1 bg-green-500 text-white py-1.5 px-2 rounded-full hover:bg-green-600 transition-all duration-300 text-xs sm:text-sm hover:shadow-md flex items-center justify-center"
      >
        <MessageSquare size={14} className="mr-1 sm:mr-2" />
        Chat Now
      </a>
    </div>
  </div>
)

export default RestaurantCard
