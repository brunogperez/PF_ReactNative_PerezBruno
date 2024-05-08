import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { dbURL } from '../database/realtimeDB'

export const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: fetchBaseQuery({ baseUrl: dbURL }),
  tagTypes: ['profileImageGet'],
  endpoints: (builder) => ({
    //Endpoint para obtener las categorias
    getCategories: builder.query({
      query: () => `categories.json`
    }),
    //Endpoint para obtener los productos de una categoría en específico
    getProductsByCategory: builder.query({
      query: (category) => `products.json?orderBy="category"&equalTo="${category}"`,
      transformResponse: (response) => {
        const result = Object.values(response)
        return result
      }
    }),
    //Endpoint para obtener un producto específico por su ID
    getProductsByID: builder.query({
      query: (productID) => `products.json?orderBy="id"&equalTo=${productID}`,
      transformResponse: (req) => {
        const result = Object.values(req)
        if (result.length) return result[0]
        return null
      }
    }),
    //Endpoint para enviar los datos de la orden de compra de un cart
    postOrder: builder.mutation({
      query: ({ ...order }) => ({
        url: 'orders.json',
        method: 'POST',
        body: order
      })
    }),
    //Endpoint para obtener la imagen de perfil del usuario desde la base de datos
    getProfileImage: builder.query({
      query: (localId) => `profileImages/${localId}.json`,
      providesTags: ['profileImageGet']
    }),
    //Endpoint para guardar una imagen de perfil de un usuario en específico en la base de datos
    postProfileImage: builder.mutation({
      query: ({ image, localId }) => ({
        url: `profileImages/${localId}.json`, //Corresponde al uuid del usuario en la DB
        method: "PUT",
        body: {
          image: image
        },
      }),
      invalidatesTags: ['profileImageGet'] //Invalida el tag del image y se dispara un nuevo GET para hacerle nuevamente un fetch y actualizar la imagen
    }),
  })
})

export const {
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
  useGetProductsByIDQuery,
  usePostOrderMutation,
  useGetProfileImageQuery,
  usePostProfileImageMutation
} = shopApi