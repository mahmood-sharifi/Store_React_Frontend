import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetUserDto, GetUsersParams, UpdateUserDto } from './userTypes';
import { PaginatedResult } from '../sharedTypes';

const API_BASE_URL = 'https://testazuredevops-euephrc9ewffdqgn.canadacentral-01.azurewebsites.net/api/v1/';  // Replace with your actual API URL

export const userApi = createApi({
  reducerPath: 'userApi',
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
    // Get all users with pagination and optional filters (role, page, perPage)
    getAllUsers: builder.query<PaginatedResult<GetUserDto>, GetUsersParams>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params?.page) searchParams.append('page', params.page.toString());
        if (params?.perPage)
          searchParams.append('perPage', params.perPage.toString());
        if (params?.role) searchParams.append('role', params.role);

        return {
          url: 'users',
          params: searchParams,
        };
      },
    }),

    // Get a user by ID
    getUserById: builder.query<GetUserDto, number>({
      query: (userId) => `users/${userId}`,
      // RTK Query supports disabling the query by returning undefined when userId is null
      transformResponse: (response: GetUserDto) => response,
      keepUnusedDataFor: 60, // Optional, keep unused data for 60 seconds
    }),

    // Get the current logged-in user
    getCurrentUser: builder.query<GetUserDto, void>({
      query: () => 'users/me',
    }),

    // Update a user by ID
    updateUser: builder.mutation<GetUserDto, { userId: number; userData: UpdateUserDto }>({
      query: ({ userId, userData }) => ({
        url: `users/${userId}`,
        method: 'PATCH',
        body: Object.fromEntries(
          Object.entries(userData).filter(([_, value]) => value !== undefined)
        ),
      }),
    }),

    // Delete a user by ID
    deleteUser: builder.mutation<void, number>({
      query: (userId) => ({
        url: `users/${userId}`,
        method: 'DELETE',
      }),
      transformResponse: (response: Response) => {
        if (response.status !== 204) {
          throw new Error('Failed to delete user');
        }
      },
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useGetCurrentUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
