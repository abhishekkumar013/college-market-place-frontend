import React from 'react'
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const DeveloperCard = ({
  name,
  role,
  imageUrl,
  isHighlighted,
  linkdin,
  github,
  insta,
}) => {
  return (
    <div className="flex flex-col items-center p-4 m-2 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className={`relative mb-4 ${isHighlighted ? 'bg-blue-500' : ''}`}>
        <img
          src={imageUrl}
          alt={name}
          className="w-48 h-48 object-cover rounded-lg"
        />
        {isHighlighted && (
          <span className="absolute bottom-0 right-0 bg-blue-500 text-white px-2 py-1 text-sm">
            T
          </span>
        )}
      </div>
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-sm text-gray-600 mb-4">{role}</p>
      <div className="flex space-x-4">
        <Link
          to={linkdin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
        >
          <FaLinkedin size={24} />
        </Link>
        <Link
          to={github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-800 hover:text-gray-600"
        >
          <FaGithub size={24} />
        </Link>
        <Link
          to={insta}
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-600 hover:text-pink-800"
        >
          <FaInstagram size={24} />
        </Link>
      </div>
    </div>
  )
}

export default DeveloperCard
