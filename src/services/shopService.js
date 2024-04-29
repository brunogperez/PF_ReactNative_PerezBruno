import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { dbURL } from '../database/realtimeDB'

export const shopApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: dbURL }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `categories.json`
    }),
    getProductsByCategory: builder.query({
      query: (category) => `products.json?orderBy="category"&equalTo="${category}"`,
      transformResponse: (response) => {
        const result = Object.values(response)
        return result
      }
    }),
    getProductsByID: builder.query({
      query: (productID) => `products.json?orderBy="id"&equalTo=${productID}`,
      transformResponse: (req) => {
        const result = Object.values(req)
        if(result.length) return result[0]
        return null
      }
    })

  })
})

export const {
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
  useGetProductsByIDQuery
} = shopApi