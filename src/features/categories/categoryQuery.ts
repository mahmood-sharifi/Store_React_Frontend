import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetCategoryDto, CreateCategoryDto, PartialUpdateCategoryDto, GetCategoriesParams } from './categoryTypes';
import { PaginatedResult } from '../sharedTypes';

const API_BASE_URL = 'https://testazuredevops-euephrc9ewffdqgn.canadacentral-01.azurewebsites.net/api/v1/';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
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
    getAllCategories: builder.query<PaginatedResult<GetCategoryDto>, GetCategoriesParams>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params?.page) searchParams.append('page', params.page.toString());
        if (params?.perPage) searchParams.append('perPage', params.perPage.toString());
        if (params?.categoryId) searchParams.append('parentCategoryId', params.categoryId.toString());

        return {
          url: 'categories',
          params: searchParams,
        };
      },
    }),
    getCategoryById: builder.query<GetCategoryDto, number>({
      query: (categoryId) => `categories/${categoryId}`,
    }),
    createCategory: builder.mutation<GetCategoryDto, CreateCategoryDto>({
      query: (formData) => ({
        url: 'categories',
        method: 'POST',
        body: formData,
      }),
    }),
    updateCategory: builder.mutation<GetCategoryDto, { id: number; categoryData: PartialUpdateCategoryDto }>({
      query: ({ id, categoryData }) => ({
        url: `categories/${id}`,
        method: 'PATCH',
        body: categoryData,
      }),
    }),
    deleteCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `categories/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
