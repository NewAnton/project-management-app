import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const kanbanApi = createApi({
  reducerPath: 'kanbanApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://project-management-system-backend.up.railway.app',
  }),
  endpoints: (builder) => ({}),
});
