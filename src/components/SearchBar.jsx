import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SearchProducts } from '../store/slices/productSlice'
import { useNavigate } from 'react-router-dom'
import { Search, ChevronDown, X } from 'lucide-react'

const hostelList = [
  'KP-1',
  'KP-2',
  'KP-3',
  'KP-4',
  'KP-5',
  'KP-5A',
  'KP-6AB',
  'KP-6C',
  'KP-7AB',
  'KP-7C',
  'KP-7D',
  'KP-7E',
  'KP-8A',
  'KP-8BC',
  'KP-9C',
  'KP-10A',
  'KP-10B',
  'KP-11',
  'KP-12',
  'KP-14',
  'KP-15',
  'KP-16ABC',
  'KP-18',
  'KP-19',
  'KP-20',
  'KP-21',
  'KP-22',
  'KP-23',
  'KP-24',
  'KP-25',
  'QC-1',
  'QC-2',
  'QC-3',
  'QC-4',
  'QC-5',
  'QC-8',
  'QC-9',
  'QC-10',
  'QC-11',
  'QC-16',
  'QC-17',
]

const CustomDropdown = ({ value, onChange, options = [], placeholder }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAll, setShowAll] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
        setShowAll(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const normalizeString = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '')

  const filteredOptions = options.filter((option) =>
    normalizeString(option.name).includes(normalizeString(searchTerm)),
  )

  const displayedOptions = searchTerm
    ? filteredOptions
    : showAll
    ? options
    : options.slice(0, 4)

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className="flex items-center justify-between w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">{value ? value.name : placeholder}</span>
        <ChevronDown size={20} />
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 shadow-lg">
          <div className="p-2 border-b border-gray-200 ">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 text-sm border rounded"
            />
          </div>
          <div className="max-h-60 overflow-y-auto">
            {displayedOptions.map((option) => (
              <div
                key={option._id}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                onClick={() => {
                  onChange(option)
                  setIsOpen(false)
                  setSearchTerm('')
                  setShowAll(false)
                }}
              >
                {option.name}
              </div>
            ))}
            {!searchTerm && !showAll && options.length > 4 && (
              <div
                className="px-3 py-2 text-sm text-blue-500 cursor-pointer hover:bg-gray-100"
                onClick={() => setShowAll(true)}
              >
                Show all...
              </div>
            )}
          </div>
          {filteredOptions.length === 0 && (
            <div className="px-3 py-2 text-sm text-gray-500">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const SearchBox = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { categories } = useSelector((state) => state.category)

  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState(null)
  const [hostel, setHostel] = useState(null)
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    dispatch(
      SearchProducts({
        keyword,
        categoryId: category ? category._id : '',
        hostel: hostel ? hostel.name : '',
      }),
    )
    setKeyword('')
    setCategory(null)
    setHostel(null)
    navigate('/product')
  }

  const hostelOptions = hostelList.map((hostelName) => ({
    _id: hostelName,
    name: hostelName,
  }))

  return (
    <form onSubmit={handleSearch} className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search Products..."
            className="w-full p-2 pl-8 border border-gray-300 rounded"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        <button
          type="button"
          className="md:hidden bg-gray-200 text-gray-700 px-4 py-2 rounded"
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
        >
          {isAdvancedOpen ? (
            <div className="flex flex-row gap-5 items-center">
              <X size={20} className="mr-1" />
              <span>Close</span>
            </div>
          ) : (
            <div className="flex flex-row gap-5 item-center">
              <ChevronDown size={20} className="mr-1" />
              <span>Filter</span>
            </div>
          )}
        </button>
        <div
          className={`md:flex ${
            isAdvancedOpen ? 'flex' : 'hidden'
          } flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2`}
        >
          <div className="w-full md:w-48">
            <CustomDropdown
              value={category}
              onChange={setCategory}
              options={categories}
              placeholder="All Categories"
            />
          </div>
          <div className="w-full md:w-48">
            <CustomDropdown
              value={hostel}
              onChange={setHostel}
              options={hostelOptions}
              placeholder="All Hostels"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
        >
          Search
        </button>
      </div>
    </form>
  )
}

export default SearchBox
