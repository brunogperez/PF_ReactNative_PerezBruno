import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import OrderData from '../data/orders.json'
import OrderItem from '../components/OrderItem'
import LayoutCustom from '../components/LayoutCustom'

const Orders = () => {
  return (
    <LayoutCustom style={styles.container}>
      <FlatList
        data={OrderData}
        keyExtractor={orderItem => orderItem.id}
        renderItem={({ item }) => {
          return (
            <OrderItem
              order={item}
            />
          )
        }}
      />
    </LayoutCustom>
  )
}

export default Orders

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})