import React from 'react'

const SearchBar = () => {
  return (
    <div className="mt-4 md:mt-0 md:ml-4 md:flex-grow md:max-w-3xl">
      <div className="flex flex-col md:flex-row">
        <input
          type="text"
          placeholder="Search Products..."
          className="flex-grow p-2 rounded-t md:rounded-l md:rounded-t-none border border-gray-300 mb-2 md:mb-0"
        />

        <select className="p-2 border border-gray-300 mb-2 md:mb-0 md:border-l-0">
          <option>All Categories</option>
        </select>
        <button className="bg-green-500 text-white px-4 py-2 rounded-b md:rounded-r md:rounded-b-none">
          Search
        </button>
      </div>
    </div>
  )
}

export default SearchBar
