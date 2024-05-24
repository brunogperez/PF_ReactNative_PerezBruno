import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { dbURL } from '../database/realtimeDB'

export const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: fetchBaseQuery({ baseUrl: dbURL }),
  tagTypes: ['profileImageGet', 'locationGet', 'getOrders'], //Declaramos los tags correspondientes
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
    //Endpoint para obtener el carrito de un cliente
    getCartbyId: builder.query({
      query: (localId) => `carts/${localId}.json`,
      transformResponse: (req) => {
        if (req != null) {
          const result = Object.values(req)
          if (result.length) return result[0]
        } 
      },
    }),
    //Endpoint para agregar los productos al carrito
    postProductsInCart: builder.mutation({
      query: ({ cart, localId }) => ({
        url: `carts/${localId}.json`,
        method: 'PUT',
        body: {
          cart
        }
      }),
    }),
    //Endpoint para obtener las ordenes de la DB
    getOrders: builder.query({
      query: () => `orders.json`,
      providesTags: ['getOrders']
    }),
    //Endpoint para enviar los datos de la orden de compra de un cart
    postOrder: builder.mutation({
      query: ({ ...order }) => ({
        url: `orders.json`,
        method: 'POST',
        body: order
      }),
      invalidatesTags: ['getOrders']
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
      //Invalida el tag del image y se dispara un nuevo GET para hacerle nuevamente un fetch y actualizar la imagen
      invalidatesTags: ['profileImageGet']
    }),
    getLocation: builder.query({
      query: (localId) => `locations/${localId}.json`,
      providesTags: ['locationGet']
    }),
    postLocation: builder.mutation({
      query: ({ location, localId }) => ({
        url: `locations/${localId}.json`,
        method: "PUT",
        body: {
          latitude: location.latitude,
          longitude: location.longitude,
          address: location.address
        },
      }),
      //Invalida el tag del location y se dispara un nuevo GET para hacerle nuevamente un fetch y actualizar la location
      invalidatesTags: ['locationGet']
    }),
  })
})

export const {
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
  useGetProductsByIDQuery,
  useGetCartbyIdQuery,
  useGetOrdersQuery,
  useGetProfileImageQuery,
  useGetLocationQuery,
  usePostProductsInCartMutation,
  usePostOrderMutation,
  usePostProfileImageMutation,
  usePostLocationMutation
} = shopApi