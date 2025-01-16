import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../features/products/productsQuery';
import Loading from '../components/atoms/Loading';
import Error from '../components/atoms/Error';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import ProductImageSlider from '../components/molecules/ProductImageSlider';
import ProductDetailInfo from '../components/organisms/ProductDetailInfo';

interface ProductPageProps {
  role: string;  // Add role as a prop
}

const ProductPage: React.FC<ProductPageProps> = ({ role }) => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetProductByIdQuery(id);

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;
console.log(data?.productImage, 'asd')
  return (
    <Container>
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <ProductImageSlider images={data?.productImage || []} />
          </Grid>
          <Grid item xs={12} md={6}>
            {data && <ProductDetailInfo product={data} />}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProductPage;
