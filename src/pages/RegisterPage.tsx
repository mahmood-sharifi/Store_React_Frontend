import React from 'react';
import { useGetProductByIdQuery } from '../features/products/productsQuery';
import Loading from '../components/atoms/Loading';
import Error from '../components/atoms/Error';
import Container from '@mui/material/Container';
import { Box } from '@mui/material';
import RegisterForm from '../components/organisms/RegisterForm'

const LoginPage: React.FC = () => {

  // if (isLoading) return <Loading />;
  // if (error) return <Error error={error} />;

  return (
    <Container>
      <Box p={2}>
      <RegisterForm/>
        {/* <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <ProductImageSlider images={data?.images || []} />
          </Grid>
          <Grid item xs={12} md={6}>
            {data && <ProductDetailInfo product={data} />}
          </Grid>
        </Grid> */}
      </Box>
    </Container>
  );
};

export default LoginPage;
