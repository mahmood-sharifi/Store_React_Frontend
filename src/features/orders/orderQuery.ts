import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateOrderDto, GetOrderDto, GetAllOrdersResponse } from './orderTypes';

const API_BASE_URL = 'https://testazuredevops-euephrc9ewffdqgn.canadacentral-01.azurewebsites.net/api/v1/'; // Replace with actual API URL

export const orderApi = createApi({
  reducerPath: 'orderApi',
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
    getAllOrders: builder.query<GetAllOrdersResponse, { page?: number; perPage?: number; userId?: number }>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params?.page) searchParams.append('page', params.page.toString());
        if (params?.perPage) searchParams.append('perPage', params.perPage.toString());
        if (params?.userId) searchParams.append('userId', params.userId.toString());

        return {
          url: 'orders',
          params: searchParams,
        };
      },
    }),
    getOrderById: builder.query<GetOrderDto, number>({
      query: (orderId) => `orders/${orderId}`,
    }),
    createOrder: builder.mutation<GetOrderDto, CreateOrderDto>({
      query: (orderData) => ({
        url: 'orders',
        method: 'POST',
        body: orderData,
      }),
    }),
    deleteOrder: builder.mutation<void, number>({
      query: (orderId) => ({
        url: `orders/${orderId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
