import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import { Product } from '../../types'

interface ProductDetailInfoProps {
  product: Product
}

const ProductDetailInfo: React.FC<ProductDetailInfoProps> = ({ product }) => {

  return (
    <Box p={2} component={Paper} elevation={3}>
      <Typography variant="h4" gutterBottom>
        {product.title}
      </Typography>
      <Typography variant="body1" paragraph>
        {product.description}
      </Typography>
      <Typography variant="h5" color="text.primary" gutterBottom>
        ${product.price}
      </Typography>
      <Typography variant="body2" color="text.secondary" mt={2}>
        Brand: {product.brand}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Category: {product.category}
      </Typography>
      <Box mt={4}>
        <Typography variant="h6">Reviews</Typography>
        {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map((review, index) => (
            <Box key={index} mt={2} component={Paper} p={2} elevation={1} bgcolor="#f9f9f9">
              <Rating value={review.rating} readOnly />
              <Typography variant="body2">{review.comment}</Typography>
              <Typography variant="caption" color="text.secondary">{`- ${
                review.reviewerName
              } on ${new Date(review.date).toLocaleDateString()}`}</Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No reviews available.
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default ProductDetailInfo
