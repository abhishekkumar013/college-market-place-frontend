import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { server } from '../../main'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const updateLocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart))
}

const initialState = {
  products: [],
  latestProducts: [],
  myProduct: [],
  hasMore: JSON.parse(localStorage.getItem('hasMore')) || false,
  searchResults: null,
  saleout: [],
  myOrder: [],
  MyProductPlaced: [],
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  message: '',
  loading: false,
  isProductLoading: false,
  error: null,
  shouldRefreshProductList: false,
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload
    },
    setMessage(state, action) {
      state.message = action.payload
    },
    setError(state, action) {
      state.error = action.payload
    },
    addProduct(state, action) {
      state.products.push(action.payload)
      state.shouldRefreshProductList = true
    },
    setAllProducts(state, action) {
      const { products, hasMore } = action.payload
      const existingProducts = new Map(
        state.products.map((product) => [product._id, product]),
      )

      products.forEach((product) => existingProducts.set(product._id, product))

      state.products = Array.from(existingProducts.values())
      state.hasMore = hasMore
      localStorage.setItem('hasMore', hasMore)
    },
    addTocart(state, action) {
      const newItem = action.payload
      const existingItem = state.cart.find((item) => item._id === newItem._id)
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1
      } else {
        state.cart.push({ ...newItem, quantity: 1 })
      }
      updateLocalStorage(state.cart)
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter((item) => item._id !== action.payload)
      updateLocalStorage(state.cart)
    },
    clearCart(state, action) {
      state.cart = []
      updateLocalStorage(state.cart)
    },
    updateCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.cart.find((item) => item._id === id)
      if (item) {
        item.quantity = quantity
      }
      updateLocalStorage(state.cart)
    },
    setAllLLatestProducts(state, action) {
      state.latestProducts = action.payload
    },
    setMyProduct(state, action) {
      state.myProduct = action.payload
    },
    setSearchResults(state, action) {
      state.searchResults = action.payload
    },
    setMySales(state, action) {
      state.saleout = action.payload
    },
    clearSearchResults: (state) => {
      state.searchResults = null
    },
    setMyOrdr(state, action) {
      state.myOrder = action.payload
    },
    clearMyOrdr(state, action) {
      state.myOrder = []
    },
    clearMysales(state, action) {
      state.saleout = []
    },

    myProdcutDelete(state, action) {
      state.shouldRefreshProductList = true
    },
    setMyPlacedProduct(state, action) {
      state.MyProductPlaced = action.payload
    },
    clearMyPlacedProduct(state, action) {
      state.MyProductPlaced = []
    },

    clearMessage(state) {
      state.message = ''
      state.error = null
    },
    setisProductLoading(state, action) {
      state.isProductLoading = action.payload
    },
  },
})

export const {
  setLoading,
  setMessage,
  setError,
  addProduct,
  setAllProducts,
  setAllLLatestProducts,
  clearMessage,
  addTocart,
  clearSearchResults,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  setMyProduct,
  setSearchResults,
  setMySales,
  clearMysales,
  setMyOrdr,
  clearMyOrdr,
  setMyPlacedProduct,
  clearMyPlacedProduct,
  myProdcutDelete,
  setisProductLoading,
} = productSlice.actions

export default productSlice.reducer

export const addNewProduct = (productData) => {
  return async (dispatch, getState) => {
    dispatch(setisProductLoading(true))
    dispatch(clearMessage())

    try {
      const { data } = await axios.post(`${server}/product/add`, productData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if (data.success) {
        toast.success(data.message)
        dispatch(addProduct(data.data))
        dispatch(setMessage(data.message || 'Product added successfully'))
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to add product')
      dispatch(
        setError(error?.response?.data?.message || 'Failed to add product'),
      )
    } finally {
      dispatch(setisProductLoading(false))
    }
  }
}

// export const getAllProducts = () => {
//   return async (dispatch) => {
//     dispatch(setLoading(true))
//     dispatch(clearMessage())

//     try {
//       const { data } = await axios.get(`${server}/product/all`, {
//         withCredentials: true,
//       })
//       // console.log(data.data)
//       dispatch(setAllProducts(data.data))
//       dispatch(setMessage(data.message || 'Products fetched successfully'))
//     } catch (error) {
//       dispatch(
//         setError(error.response?.data?.message || 'Failed to fetch products'),
//       )
//     } finally {
//       dispatch(setLoading(false))
//     }
//   }
// }
export const getAllProducts = (page = 1, limit = 8) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true))
    dispatch(clearMessage())

    try {
      const { data } = await axios.get(`${server}/product/all`, {
        params: { page, limit },
        withCredentials: true,
      })

      dispatch(
        setAllProducts({
          products: data.data,
          hasMore: data.pagination.hasMore,
        }),
      )
      dispatch(setMessage(data.message || 'Products fetched successfully'))
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || 'Failed to fetch products'),
      )
    } finally {
      dispatch(setLoading(false))
    }
  }
}
// latest
export const getAllLatestProducts = () => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true))
    dispatch(clearMessage())

    try {
      const { data } = await axios.get(`${server}/product/latest`, {
        withCredentials: true,
      })

      dispatch(setAllLLatestProducts(data.data))
      dispatch(setMessage(data.message || 'Products fetched successfully'))
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || 'Failed to fetch products'),
      )
    } finally {
      dispatch(setLoading(false))
    }
  }
}

export const addNewToCart = (data) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true))
    dispatch(clearMessage())
    try {
      const { cart } = getState().product
      const existingItem = cart.find((item) => item._id === data._id)
      if (existingItem) {
        dispatch(setMessage('Product quantity increased in cart'))
      } else {
        dispatch(setMessage('Product added to cart'))
      }
      dispatch(addTocart(data))
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || 'Failed to add to cart'),
      )
    } finally {
      dispatch(setLoading(false))
    }
  }
}

export const removeProductFromCart = (_id) => {
  return async (dispatch) => {
    dispatch(setLoading(true))
    dispatch(clearMessage())
    try {
      // Remove the product from the cart
      dispatch(removeFromCart(_id))

      // Set a success message
      dispatch(setMessage('Product removed from cart successfully'))
    } catch (error) {
      // If there's an error, dispatch an error action
      dispatch(
        setError(
          error.response?.data?.message || 'Failed to remove product from cart',
        ),
      )
    } finally {
      dispatch(setLoading(false))
    }
  }
}

export const getAllMyProduct = () => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true))
    dispatch(clearMessage())
    const { token } = getState().auth
    try {
      const { data } = await axios.get(
        `${server}/product/myproduct`,

        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      dispatch(setMyProduct(data.data))
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message || 'Failed to get youur product',
        ),
      )
    } finally {
      dispatch(setLoading(false))
    }
  }
}

export const getAllMyOrder = () => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true))
    dispatch(clearMessage())
    const { token } = getState().auth
    try {
      const { data } = await axios.get(`${server}/order/get-buyer`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (data.data && data.data.length > 0) {
        dispatch(setMyOrdr(data.data))
      }
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message || 'Failed to get youur product',
        ),
      )
      dispatch(clearMyOrdr())
    } finally {
      dispatch(setLoading(false))
    }
  }
}
export const getAllMySales = () => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true))
    dispatch(clearMessage())
    const { token } = getState().auth
    try {
      const { data } = await axios.get(`${server}/order/get-sales`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (data.data && data.data.length > 0) {
        dispatch(setMySales(data.data))
      }
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || 'Failed to get your product'),
      )
      dispatch(clearMysales())
    } finally {
      dispatch(setLoading(false))
    }
  }
}

// jo product mera order hua h kisi dwara
export const getAllReviewOrder = () => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true))
    dispatch(clearMessage())

    try {
      const { data } = await axios.get(`${server}/order/get-seller`, {
        withCredentials: true,
      })

      if (data.data && data.data.length > 0) {
        dispatch(setMyPlacedProduct(data.data))
      }
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || 'Failed to get your product'),
      )
      dispatch(clearMyPlacedProduct())
    } finally {
      dispatch(setLoading(false))
    }
  }
}
export const deleteMyProduct = (id) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true))
    dispatch(clearMessage())
    const { token } = getState().auth
    try {
      const { data } = await axios.delete(`${server}/product/delete/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (data.success) {
        toast.success(data.message)
      }
      dispatch(myProdcutDelete())
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message || 'Failed to delete your product',
        ),
      )
      toast.error(error.response?.data?.message)
    } finally {
      dispatch(setLoading(false))
    }
  }
}

export const updateProductStatus = (id) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true))
    dispatch(clearMessage())
    const { token } = getState().auth
    try {
      const { data } = await axios.put(
        `${server}/product/update-status/${id}`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (data.success) {
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
      dispatch(myProdcutDelete())
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message || 'Failed to update product status',
        ),
      )
    } finally {
      dispatch(setLoading(false))
    }
  }
}
export const updateProduct = (dataobj) => {
  return async (dispatch, getState) => {
    const { token } = getState().auth
    dispatch(setLoading(true))
    dispatch(clearMessage())
    try {
      const { data } = await axios.put(
        `${server}/product/update/${dataobj.id}`,
        dataobj,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (data.success) {
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
      dispatch(getAllProducts())
      dispatch(getAllLatestProducts())
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message || 'Failed to update product status',
        ),
      )
    } finally {
      dispatch(setLoading(false))
    }
  }
}
export const SearchProducts = (params) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true))
    dispatch(clearMessage())
    dispatch(clearSearchResults())
    const { token } = getState().auth
    try {
      let url = `${server}/product/products/search?`

      if (params.categoryId) {
        url += `category=${params.categoryId}&`
      }

      if (params.keyword) {
        url += `keyword=${params.keyword}&`
      }
      if (params.hostel) {
        url += `hostel=${params.hostel}`
      }

      const { data } = await axios.get(url, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (data.success) {
        dispatch(setSearchResults(data.data))
      }
      // toast.success(data.message)
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || 'Failed to search products'),
      )
      // toast.error(error.response?.data?.message)
    } finally {
      dispatch(setLoading(false))
    }
  }
}
export const PlacedOrder = (dataobj) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true))
    dispatch(clearMessage())
    const { token } = getState().auth
    try {
      const { data } = await axios.post(
        `${server}/order/create-order`,
        dataobj,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (!data.success) {
        toast.error(data.message)
      }
    } catch (error) {
     
      dispatch(
        setError(error.response?.data?.message || 'Failed to search products'),
      )
    } finally {
      dispatch(setLoading(false))
    }
  }
}

// export const SearchByCategory = (id) => {
//   return async (dispatch, getState) => {
//     dispatch(setLoading(true))
//     dispatch(clearMessage())
//     try {
//       const { data } = await axios.get(`${server}/product/category/${id}`, {
//         withCredentials: true,
//       })

//       if (data.success) {
//         toast.success(data.message)
//         setMyProduct(data.data)
//       } else {
//         toast.error(data.message)
//       }
//     } catch (error) {
//       dispatch(
//         setError(error.response?.data?.message || 'Failed to search product'),
//       )
//     } finally {
//       dispatch(setLoading(false))
//     }
//   }
// }

// export const SearchByKeyWord = (data) => {
//   return async (dispatch, getState) => {
//     dispatch(setLoading(true))
//     dispatch(clearMessage())
//     try {
//       const { data } = await axios.get(
//         `${server}/product/search?keyword=${data}`,
//         {
//           withCredentials: true,
//         },
//       )

//       if (data.success) {
//         toast.success(data.message)
//         setMyProduct(data.data)
//       } else {
//         toast.error(data.message)
//       }
//     } catch (error) {
//       dispatch(
//         setError(error.response?.data?.message || 'Failed to search product'),
//       )
//     } finally {
//       dispatch(setLoading(false))
//     }
//   }
// }
export const updateOrder = (dataobj) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true))
    dispatch(clearMessage())
    const { token } = getState().auth
    try {
      const { data } = await axios.put(`${server}/order/update`, dataobj, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (data.success) {
        toast.success('Order updated successfully')
        return Promise.resolve(data)
      } else {
        toast.error(data.message)
        return Promise.reject(data.message)
      }
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || 'Failed to update order'),
      )
      return Promise.reject(
        error.response?.data?.message || 'Failed to update order',
      )
    } finally {
      dispatch(setLoading(false))
    }
  }
}

export const updateProductImage = (dataobj) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true))
    dispatch(clearMessage())
    const { token } = getState().auth

    try {
      const formData = new FormData()
      formData.append('image', dataobj.image)

      const { data } = await axios.put(
        `${server}/product/update-image/${dataobj.id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      )

      if (data.success) {
        toast.success(data.message)
        dispatch(getAllMyProduct())
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message)
      dispatch(
        setError(error.response?.data?.message || 'Failed to update image'),
      )
    } finally {
      dispatch(setLoading(false))
    }
  }
}
