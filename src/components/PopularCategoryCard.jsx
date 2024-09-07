import React from 'react'

const PopularCategoryCard = ({ image, title }) => {
  return (
    <div className="bg-green-200 rounded-lg p-4 flex flex-col items-center transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
      <img src={image} alt={title} className="w-24 h-24 object-contain mb-2" />
      <p className="text-center font-semibold">{title}</p>
    </div>
  )
}

export default PopularCategoryCard
