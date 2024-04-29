import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CartData from '../data/cart.json'
import CartItem from '../components/CartItem'
import { useSelector } from 'react-redux'

const Cart = () => {

  const { cart } = useSelector((state) => state.cartReducer.value)

  const total = cart.reduce((acc, productItem) => acc += productItem.price * productItem.quantity, 0)
  
  if (cart == []) {
    return (
      <View style={styles.container}>
        <Text>
          Tu carrito está vacio
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
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
        <Text>Total: ${total}</Text>
        <Pressable>
          <Text>
            Purcharse
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  totalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    gap: 20
  }
})