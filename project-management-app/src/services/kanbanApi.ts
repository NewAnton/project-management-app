import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  SignUpRequest,
  SignUpResponse,
  SignInRequest,
  SignInResponse,
  userInterface,
} from '../types/kanbanApiTypes';
import { getToken } from './getToken';

export const kanbanApi = createApi({
  reducerPath: 'kanbanApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://project-management-system-backend.up.railway.app',
    prepareHeaders: (headers) => {
      const token = getToken();
      console.log('token');
      if (token) {
        headers.set('Authorization', 'Bearer ' + token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    authSignUp: builder.mutation<SignUpRequest, SignUpResponse>({
      query: (payload) => ({
        url: `/auth/signup`,
        method: 'POST',
        body: payload,
      }),
    }),
    authSignIn: builder.query<SignInResponse, SignInRequest>({
      query: (payload) => ({
        url: `/auth/signin`,
        method: 'POST',
        body: payload,
      }),
      // async queryFn({ login, password }) {
      //   const response = await fetch(
      //     `https://project-management-system-backend.up.railway.app/auth/signin`,
      //     {
      //       method: 'POST',
      //       headers: {
      //         Accept: 'application/json',
      //         'Content-Type': 'application/json',
      //       },
      //       body: JSON.stringify({ login: `${login}`, password: `${password}` }),
      //     }
      //   );
      //   if (response.ok) {
      //     const data = await response.json();
      //     console.log(data);
      //     localStorage.setItem('token', data.token);
      //     return { data };
      //   } else return { error: 'error' };
      // },
    }),
    getUsers: builder.query<userInterface, void>({
      query: () => ({
        url: `/users`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useAuthSignUpMutation, useAuthSignInQuery, useGetUsersQuery } = kanbanApi;
