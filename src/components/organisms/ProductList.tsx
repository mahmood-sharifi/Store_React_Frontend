import React from 'react';
import { Grid } from '@mui/material';
import ProductCard from '../molecules/ProductCard';
import { Product } from '../../types';

interface ProductListProps {
  products: Product[];
  role: string;
}

const ProductList: React.FC<ProductListProps> = ({ products, role }) => {
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <ProductCard product={product} role={role} /> 
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
