import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetProductDto, CreateProductDto, UpdateProductDto, GetProductsParams } from './productTypes';
import { PaginatedResult } from '../sharedTypes';

const API_BASE_URL = 'https://testazuredevops-euephrc9ewffdqgn.canadacentral-01.azurewebsites.net/api/v1/';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Get all products with pagination and optional filtering
    getAllProducts: builder.query<PaginatedResult<GetProductDto>, GetProductsParams>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params?.page) searchParams.append('page', params.page.toString());
        if (params?.perPage) searchParams.append('perPage', params.perPage.toString());
        if (params?.categoryId) searchParams.append('categoryId', params.categoryId.toString());

        return {
          url: 'products',
          params: searchParams,
        };
      },
    }),

    // Get a specific product by its ID
    getProductById: builder.query<GetProductDto, number>({
      query: (productId) => `products/${productId}`,
    }),

    // Create a new product with FormData (for images)
    createProduct: builder.mutation<GetProductDto, CreateProductDto>({
      query: (formData) => ({
    url: 'products',
    method: 'POST',
    body: formData,  // Directly pass FormData
  }),
    }),

    // Update an existing product by its ID
    updateProduct: builder.mutation<GetProductDto, { id: number; productData: UpdateProductDto }>({
      query: ({ id, productData }) => ({
        url: `products/${id}`,
        method: 'PUT',
        body: productData,
      }),
    }),

    // Delete a product by its ID
    deleteProduct: builder.mutation<void, number>({
      query: (productId) => ({
        url: `products/${productId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Export the auto-generated hooks for using the queries and mutations
export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
