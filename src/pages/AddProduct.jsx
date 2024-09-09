import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewProduct } from '../store/slices/productSlice'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout/Layout'

const AddProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)
  const { isProductLoading } = useSelector((state) => state.product)

  const [quantity, setQuantity] = useState(1)
  const [imagePreview, setImagePreview] = useState(null)
  const [image, setImage] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [mrp, setMrp] = useState('')
  const [discount, setDiscount] = useState('')
  const [finalPrice, setFinalPrice] = useState('')
  const [additionalCharge, setAdditionalCharge] = useState('')

  const { categories } = useSelector((state) => state.category)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        setImage(file)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleNameChange = (e) => setName(e.target.value)
  const handleDescriptionChange = (e) => setDescription(e.target.value)
  const handleCategoryChange = (e) => setCategory(e.target.value)
  const handleMrpChange = (e) => {
    const value = e.target.value
    setMrp(value)
    updateFinalPrice(value, discount)
  }
  const handleDiscountChange = (e) => {
    const value = e.target.value
    setDiscount(value)
    updateFinalPrice(mrp, value)
  }
  const handleAdditionalChargeChange = (e) => {
    const value = e.target.value
    setAdditionalCharge(value)
    updateFinalPrice(mrp, discount, value)
  }
  const updateFinalPrice = (mrp, discount) => {
    const price =
      mrp - mrp * (discount / 100) + parseFloat(additionalCharge || 0)

    setFinalPrice(price.toFixed(2))
  }

  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append('name', name)
    if (category) formData.append('category', category) // This should already be the category ID
    formData.append('quantity', parseInt(quantity, 10))
    formData.append('desc', description)
    formData.append('mrp', parseFloat(mrp))
    formData.append('discount', parseFloat(discount) || 0)
    formData.append('additionalCharge', parseFloat(additionalCharge) || 0)
    formData.append('finalPrice', parseFloat(finalPrice))

    if (image) {
      formData.append('image', image)
    }

    // console.log('FormData contents:')
    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value)
    // }

    dispatch(addNewProduct(formData))
    setQuantity(1)
    setImagePreview(null)
    setImage(null)
    setName('')
    setDescription('')
    setCategory('')
    setMrp('')
    setDiscount('')
    setFinalPrice('')
    setAdditionalCharge('')

    // navigate('/product')
  }

  if (!user.phone || user.hostel === 'None') {
    return (
      <Layout title="home" description="" keywords="" author="">
        <div className="container mx-auto p-4 text-center mt-10 ">
          <p className="text-4xl md:text-6xl text-gray-400 mb-5">
            Update Phone Nuber Before Listing {user.hostel}
          </p>
          <Link to={'/profile'} className="text-red-500 underline m-5">
            <span className="text-4xl uppercase">Click To Update</span>
          </Link>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="home" description="" keywords="" author="">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-4">
        <h1 className="text-2xl font-bold mb-6">Add Your Product</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1 md:col-span-2">
            <label htmlFor="product-image" className="block mb-2">
              Product Image<span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer">
              <input
                type="file"
                id="product-image"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <label htmlFor="product-image" className="cursor-pointer">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 mx-auto object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 mx-auto bg-gray-200 flex items-center justify-center text-gray-500">
                    <span className="text-3xl">+</span>
                  </div>
                )}
                <p className="mt-2 text-sm text-gray-500">
                  {imagePreview
                    ? 'Click to change image'
                    : 'Click here to add product image'}
                </p>
              </label>
            </div>
          </div>

          <div>
            <label className="block mb-2">
              Product Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter product name"
              className="w-full p-2 border rounded"
              value={name}
              onChange={handleNameChange}
            />
          </div>

          <div>
            <label className="block mb-2">
              Product Description<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter product description"
              className="w-full p-2 border rounded"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>

          <div>
            <label className="block mb-2">
              Choose product category<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                className="w-full p-2 border rounded appearance-none pr-8"
                value={category}
                onChange={handleCategoryChange}
              >
                <option value="">Select Categories</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-2">
              Quantity<span className="text-red-500">*</span>
            </label>
            <div className="flex items-center">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 bg-green-500 text-white rounded-l"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, Number(e.target.value)))
                }
                className="w-16 p-1 text-center border-t border-b"
              />
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1 bg-green-500 text-white rounded-r"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label className="block mb-2">
              MRP<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter the price"
              className="w-full p-2 border rounded"
              value={mrp}
              onChange={handleMrpChange}
            />
          </div>

          <div>
            <label className="block mb-2">Any Discount</label>
            <input
              type="text"
              placeholder="Enter discount percent %"
              className="w-full p-2 border rounded"
              value={discount}
              onChange={handleDiscountChange}
            />
          </div>

          <div>
            <label className="block mb-2">Final Price (Autogenerated)</label>
            <input
              type="text"
              placeholder="Final price after subtracting the discount"
              className="w-full p-2 border rounded bg-gray-100"
              value={finalPrice}
              readOnly
            />
          </div>

          <div>
            <label className="block mb-2">Any additional charges</label>
            <input
              type="text"
              placeholder="Enter the charges in rupee"
              className="w-full p-2 border rounded"
              value={additionalCharge}
              onChange={handleAdditionalChargeChange}
            />
          </div>
        </div>

        <button
          disabled={isProductLoading}
          onClick={!isProductLoading ? handleSubmit : null}
          className={`w-full mt-6 py-2 rounded text-white ${
            isProductLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600'
          }`}
          style={{
            cursor: isProductLoading ? 'not-allowed' : 'pointer',
          }}
        >
          {isProductLoading ? 'Loading...' : 'Submit'}
        </button>
      </div>
    </Layout>
  )
}

export default AddProduct
