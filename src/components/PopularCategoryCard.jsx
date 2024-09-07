import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SearchProducts } from '../store/slices/productSlice'
const PopularCategoryCard = ({ image, title, categoryId }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClick = () => {
    dispatch(SearchProducts({ categoryId: categoryId }))
    navigate('/product')
  }

  return (
    <div
      className="bg-green-200 rounded-lg p-4 flex flex-col items-center transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer"
      onClick={handleClick}
    >
      <img src={image} alt={title} className="w-24 h-24 object-contain mb-2" />
      <p className="text-center font-semibold">{title}</p>
    </div>
  )
}

export default PopularCategoryCard
