import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateUserProfile } from '../store/slices/authSlice'
import { Search } from 'lucide-react'
import Layout from '../components/Layout/Layout'

const isValidIndianMobile = (number) => {
  return /^[6-9]\d{9}$/.test(number)
}

const hostelOptions = [
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

const CustomDropdown = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const normalizeString = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '')

  const filteredOptions = options.filter((option) =>
    normalizeString(option).includes(normalizeString(searchTerm)),
  )

  const displayedOptions = searchTerm ? filteredOptions : options.slice(0, 4)

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value || 'Select a hostel'}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto">
          <div className="sticky top-0 bg-white p-2 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Search hostels..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 pl-8 text-sm border rounded"
              />
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
          {displayedOptions.map((option) => (
            <div
              key={option}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm truncate"
              onClick={() => {
                onChange(option)
                setIsOpen(false)
                setSearchTerm('')
              }}
            >
              {option}
            </div>
          ))}
          {searchTerm && filteredOptions.length === 0 && (
            <div className="px-3 py-2 text-sm text-gray-500">
              No results found
            </div>
          )}
          {!searchTerm && options.length > 4 && (
            <div className="px-3 py-2 text-sm text-gray-500 text-center">
              Type to search more options...
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const Profile = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const [displayName, setDisplayName] = useState(user.displayName)
  const [phone, setPhone] = useState(user.phone || '')
  const [phoneError, setPhoneError] = useState('')
  const [hostel, setHostel] = useState(user.hostel || '')

  console.log('userr', user)

  const handleSubmit = (e) => {
    e.preventDefault()
    setPhoneError('')

    if (!isValidIndianMobile(phone)) {
      setPhoneError('Please enter a valid 10-digit Indian mobile number')
      return
    }

    const userData = {
      displayName,
      phone,
      hostel,
    }
    dispatch(updateUserProfile(userData))
  }

  return (
    <div className="bg-white shadow-md rounded px-4 sm:px-6 lg:px-8 py-6 max-w-3xl mx-auto md:mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">User Profile</h2>
      <div className="flex flex-col sm:flex-row">
        <div className="mb-4 sm:mb-0 sm:mr-6 sm:w-1/3">
          <img
            src={user.image}
            alt={user.displayName}
            className="w-32 h-32 rounded-full mx-auto"
          />
        </div>
        <div className="sm:w-2/3 w-full">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="displayName"
              >
                Display Name:
              </label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email:
              </label>
              <p className="text-gray-700">{user.email}</p>
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold "
                htmlFor="phone"
              >
                WhatsApp No:
              </label>
              <span
                style={{
                  display: 'block',
                  color: '#a0aec0',
                  fontSize: '12px',
                  marginBottom: '8px',
                }}
              >
                <span style={{ color: 'red' }}>T&C:</span> KIITMart uses your
                phone number to facilitate connections with other users.
              </span>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  phoneError ? 'border-red-500' : ''
                }`}
              />
              {phoneError && (
                <p className="text-red-500 text-xs italic mt-1">{phoneError}</p>
              )}
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="hostel"
              >
                Hostel:
              </label>
              <CustomDropdown
                value={hostel}
                onChange={setHostel}
                options={hostelOptions}
              />
            </div>
            <div className="flex items-center justify-between pt-4">
              <button
                onClick={handleSubmit}
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile
