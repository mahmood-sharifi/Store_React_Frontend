import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetCartItemDto, CreateCartItemDto, UpdateCartItemDto, GetCartItemsParams } from './cartTypes';
import { PaginatedResult } from '../sharedTypes';

const API_BASE_URL = 'https://testazuredevops-euephrc9ewffdqgn.canadacentral-01.azurewebsites.net/api/v1/'; 

export const cartApi = createApi({
  reducerPath: 'cartApi',
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
    getAllCartItems: builder.query<PaginatedResult<GetCartItemDto>, GetCartItemsParams>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params.page) searchParams.append('page', params.page.toString());
        if (params.perPage) searchParams.append('perPage', params.perPage.toString());
        searchParams.append('userId', params.userId.toString());

        return {
          url: 'cart-items',
          params: searchParams,
        };
      },
    }),
    getCartItemById: builder.query<GetCartItemDto, number>({
      query: (cartItemId) => `cart-items/${cartItemId}`,
    }),
    createCartItem: builder.mutation<GetCartItemDto, CreateCartItemDto>({
      query: (cartItemData) => ({
        url: 'cart-items',
        method: 'POST',
        body: cartItemData,
      }),
    }),
    updateCartItem: builder.mutation<GetCartItemDto, { cartItemId: number; data: UpdateCartItemDto }>({
      query: ({ cartItemId, data }) => ({
        url: `cart-items/${cartItemId}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteCartItem: builder.mutation<void, number>({
      query: (cartItemId) => ({
        url: `cart-items/${cartItemId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllCartItemsQuery,
  useGetCartItemByIdQuery,
  useCreateCartItemMutation,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
} = cartApi;
