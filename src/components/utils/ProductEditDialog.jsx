import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  Box,
} from '@material-ui/core'
import { updateProduct } from '../../store/slices/productSlice'
// import { updateProduct, updateProductImage } from '../../store/slices/productSlice';

const ProductEditDialog = ({ open, onClose, product }) => {
  const dispatch = useDispatch()
  const [editedProduct, setEditedProduct] = useState({
    name: product.name,
    quantity: product.quantity,
    mrp: product.mrp,
    discount: product.discount,
    additionalCharge: product.additionalCharge,
    finalPrice: product.finalPrice,
    desc: product.desc,
  })
  const [newImage, setNewImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(product.image)

  useEffect(() => {
    if (newImage) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(newImage)
    } else {
      setPreviewUrl(product.image)
    }
  }, [newImage, product.image])

  const updateFinalPrice = (mrp, discount, additionalCharge) => {
    const price = mrp - mrp * (discount / 100) + Number(additionalCharge)
    return price.toFixed(2)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setEditedProduct((prev) => {
      const updatedProduct = { ...prev, [name]: value }
      if (
        name === 'mrp' ||
        name === 'discount' ||
        name === 'additionalCharge'
      ) {
        updatedProduct.finalPrice = updateFinalPrice(
          name === 'mrp' ? value : prev.mrp,
          name === 'discount' ? value : prev.discount,
          name === 'additionalCharge' ? value : prev.additionalCharge,
        )
      }
      return updatedProduct
    })
  }

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setNewImage(event.target.files[0])
    }
  }

  const handleSaveChanges = () => {
    dispatch(updateProduct({ id: product._id, ...editedProduct }))
    onClose()
  }

  const handleUpdateImage = () => {
    if (newImage) {
      // dispatch(updateProductImage({ id: product._id, image: newImage }));
      onClose()
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <img
              src={previewUrl}
              alt={product.name}
              style={{ width: '100%', marginBottom: '16px' }}
            />
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="raised-button-file">
              <Button variant="contained" component="span" fullWidth>
                Choose New Image
              </Button>
            </label>
            {newImage && (
              <Button
                onClick={handleUpdateImage}
                color="primary"
                variant="contained"
                fullWidth
                style={{ marginTop: '8px' }}
              >
                Update Image
              </Button>
            )}
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              name="name"
              label="Product Name"
              value={editedProduct.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="desc"
              label="Product Description"
              value={editedProduct.desc}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              multiline
            />
            <Box display="flex" flexWrap="wrap" justifyContent="space-between">
              <TextField
                name="quantity"
                label="Quantity"
                value={editedProduct.quantity}
                onChange={handleInputChange}
                type="number"
                margin="normal"
                style={{ width: '48%' }}
              />
              <TextField
                name="mrp"
                label="MRP"
                value={editedProduct.mrp}
                onChange={handleInputChange}
                type="number"
                margin="normal"
                style={{ width: '48%' }}
              />
            </Box>
            <Box display="flex" flexWrap="wrap" justifyContent="space-between">
              <TextField
                name="discount"
                label="Discount (%)"
                value={editedProduct.discount}
                onChange={handleInputChange}
                type="number"
                margin="normal"
                style={{ width: '48%' }}
              />
              <TextField
                name="additionalCharge"
                label="Additional Charge"
                value={editedProduct.additionalCharge}
                onChange={handleInputChange}
                type="number"
                margin="normal"
                style={{ width: '48%' }}
              />
            </Box>
            <TextField
              name="finalPrice"
              label="Final Price"
              value={editedProduct.finalPrice}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSaveChanges} color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProductEditDialog
