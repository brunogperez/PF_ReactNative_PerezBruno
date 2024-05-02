import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiKey, authUrl } from '../database/users'

export const authApi = createApi({
  reducerPath: 'authApi', // Nombre único de la API
  baseQuery: fetchBaseQuery({ baseUrl: authUrl }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: ({ ...auth }) => ({
        url: `/accounts:signUp?key=${apiKey}`,
        method: 'POST',
        body: auth
      })
    }),
    signIn: builder.mutation({
      query: ({ ...auth }) => ({
        url: `/accounts:signInWithPassword?key=${apiKey}`,
        method: "POST",
        body: auth
      })
    })
  })
})

export const {
  useSignUpMutation,
  useSignInMutation
} = authApi