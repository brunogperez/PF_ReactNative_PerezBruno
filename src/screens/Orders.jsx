import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import OrderItem from '../components/OrderItem'
import LayoutCustom from '../components/LayoutCustom'
import { useSelector } from 'react-redux'
import { useGetOrdersQuery } from '../services/shopService'


const Orders = () => {

  const { localId } = useSelector((state) => state.authReducer.value)

  const { data: ordersData, isLoading, isSuccess } = useGetOrdersQuery()

  const [ordersFiltered, setOrdersFiltered] = useState()

  useEffect(() => {

    if (isSuccess && ordersData != null) {
      const response = Object.values(ordersData)
      const ordersFiltered = response.filter(item => item.user === localId)
      setOrdersFiltered(ordersFiltered)
    }

  }, [ordersData, isSuccess, localId])


  return (
    <LayoutCustom style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size='large' />
      ) : (
        <FlatList
          data={ordersFiltered}
          keyExtractor={orderItem => orderItem.date}
          renderItem={({ item }) => {
            return (
              <OrderItem
                order={item}
              />
            )
          }}
        />
      )}
    </LayoutCustom >
  )
}

export default Orders

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    flex: 1,
    width: '100%'
  },
})