import React from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Link as MuiLink,
  Button,
  Box
} from '@mui/material'
import { Link } from 'react-router-dom'
import { useDeleteProductMutation } from '../../features/products/productsQuery'
import { GetProductDto } from '../../features/products/productTypes'

import { useDispatch, useSelector } from 'react-redux';
import { openCart } from '../../features/carts/cartSlice';
import { useCreateCartItemMutation } from '../../features/carts/cartQuery';
import { RootState } from '../../app/store';

interface ProductCardProps {
  product: GetProductDto
  role: string // Add role as a prop
}

const ProductCard: React.FC<ProductCardProps> = ({ product, role }) => {
  const [deleteProduct] = useDeleteProductMutation() // Use RTK Query's delete mutation

  const dispatch = useDispatch();
  const [createCartItem] = useCreateCartItemMutation();
  const storeProfile = useSelector((state: RootState) => state.auth.profile)
  const userId = storeProfile?.id || 0
  
  // If role is admin, allow clicking to edit the product, otherwise view the product
  const productLink = role === 'Admin' ? `/product/${product.id}/edit` : `/product/${product.id}`

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${product.title}?`)) {
      try {
        await deleteProduct(product.id).unwrap()
        alert('Product deleted successfully')
      } catch (error) {
        alert('Failed to delete product')
      }
    }
  }
  const handleAddToCart = async () => {
    try {
      await createCartItem({ productId: product.id, userId, quantity: 1 });
      dispatch(openCart());
      alert('Product added to cart successfully')
    } catch (error) {
      alert('Failed to add product to cart')
    }
  }
  console.log(product.productImage[0])
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <MuiLink
        component={Link}
        to={productLink}
        underline="none"
        sx={{ textDecoration: 'none', height: '100%' }}>
        <CardMedia
          component="img"
          image={'https://testazuredevops-euephrc9ewffdqgn.canadacentral-01.azurewebsites.net/' + product.productImage[0]?.url}
          alt={product.title}
          sx={{ height: 200, objectFit: 'cover' }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {product.description}
          </Typography>
          <Typography variant="body1" color="text.primary">
            ${product.price}
          </Typography>
        </CardContent>
      </MuiLink>

      {/* If the user is an admin, show Edit and Delete buttons */}
      {role === 'Admin' && (
        <Box sx={{ position: 'absolute', bottom: 0, right: 0, padding: 1 }}>
          <Button
            variant="outlined"
            size="small"
            component={Link}
            to={`/product/${product.id}/edit`}
            sx={{ marginRight: 1 }}>
            Edit
          </Button>
          <Button variant="outlined" color="error" size="small" onClick={handleDelete}>
            Delete
          </Button>
        </Box>
      )}
      {role === 'User' && (
        <Box sx={{ position: 'absolute', bottom: 0, right: 0, padding: 1 }}>
          <Button variant="outlined" color="error" size="small" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </Box>
      )}
    </Card>
  )
}

export default ProductCard
