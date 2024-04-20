import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CartData from '../data/cart.json'
import CartItem from '../components/CartItem'

const Cart = () => {

  const total = CartData.reduce((acumulador, productItem) => acumulador += productItem.price * productItem.quantity, 0)

  return (
    <View style={styles.container}>
      <FlatList
        data={CartData}
        keyExtractor={product => product.id}
        renderItem={({ item }) => {
          return (
            <CartItem
              cartItem={item}
            />
          )
        }}
      />
      <View style={styles.totalContainer}>
        <Pressable>
          <Text>
            Confirm
          </Text>
        </Pressable>
        <Text>Total: ${total}</Text>
      </View>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({})