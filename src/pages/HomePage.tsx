import React, { useEffect } from 'react';
import { useGetAllProductsQuery } from '../features/products/productsQuery';
import ProductList from '../components/organisms/ProductList';
import Loading from '../components/atoms/Loading';
import Error from '../components/atoms/Error';
import CustomPagination from '../components/atoms/CustomPagination';
import { useSearchParams } from 'react-router-dom';
import { Box, SelectChangeEvent, Container } from '@mui/material';
import { useSelector } from 'react-redux';  // Import useSelector to get role from Redux
import { RootState } from '../app/store';  // Import RootState for Redux typing

const HomePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const sort = searchParams.get('sort') || 'default';
  const perPage = 9;

  // Fetch user role from Redux
  const role = useSelector((state: RootState) => state.auth.profile?.role || 'Guest');  // Default to 'Guest'

  const { data, error, isLoading, isFetching } = useGetAllProductsQuery({ page, perPage });

  const handlePageChange = (newPage: number) => {
    setSearchParams({ query, sort, page: newPage.toString() });
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    setSearchParams({ query, sort: event.target.value, page: '1' });
  };

  useEffect(() => {
    if (!searchParams.get('page')) {
      setSearchParams({ query, sort, page: '1' });
    }
  }, [searchParams, setSearchParams]);

  if (isLoading || isFetching) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <Container>
      {/* <Box position="sticky" top={0} bgcolor="white" zIndex={1000} p={2}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <SearchBar />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select value={sort} onChange={handleSortChange} label="Sort By">
                <MenuItem value="default">Default</MenuItem>
                <MenuItem value="price-asc">Price: Low to High</MenuItem>
                <MenuItem value="price-desc">Price: High to Low</MenuItem>
                <MenuItem value="rating-asc">Rating: Low to High</MenuItem>
                <MenuItem value="rating-desc">Rating: High to Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box> */}
      <Box mt={2}>
        {/* Pass role to ProductList */}
        <ProductList products={data?.items || []} role={role} />
        <Box position="sticky" bottom={0} bgcolor="white" zIndex={1000} p={2}>
          <CustomPagination
            total={data?.totalItems || 0}
            limit={perPage}
            skip={perPage*(page-1)}
            onPageChange={handlePageChange}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
