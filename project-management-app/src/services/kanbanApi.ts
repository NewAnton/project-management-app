import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SignUpRequest, SignInRequest } from '../types/kanbanApiTypes';
import { getToken } from './getToken';

export const kanbanApi = createApi({
  reducerPath: 'kanbanApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://project-management-system-backend.up.railway.app',
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set('Authorization', 'Bearer' + token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    authSignUp: builder.query<SignUpRequest, string>({
      query: (payload) => ({
        url: `/auth/signup`,
        method: 'POST',
        body: payload,
      }),
    }),
    authSignIn: builder.query<SignInRequest, string>({
      query: (payload) => ({
        url: `/auth/signin`,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useAuthSignInQuery } = kanbanApi;
