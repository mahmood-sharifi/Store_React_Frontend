import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginDto, LoginResult, RegisterDto, RegisterResult } from './authTypes';

const API_BASE_URL = 'https://testazuredevops-euephrc9ewffdqgn.canadacentral-01.azurewebsites.net/api/v1/';

export const authApi = createApi({
  reducerPath: 'authApi',
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
    login: builder.mutation<LoginResult, LoginDto>({
      query: (loginData) => ({
        url: 'auth/login',
        method: 'POST',
        body: loginData,
      }),
    }),
    register: builder.mutation<RegisterResult, FormData>({
      query: (formData) => ({
        url: 'auth/register',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
