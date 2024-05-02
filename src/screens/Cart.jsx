import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CartItem from '../components/CartItem'
import { useSelector } from 'react-redux'
import { usePostOrderMutation } from '../services/shopService'
import ButtonCustom from '../components/ButtonCustom'
import { colors } from '../constants/colors'

const Cart = () => {

  const { cart, total } = useSelector((state) => state.cartReducer.value)
  const isDark = useSelector(state => state.globalReducer.value.darkMode)

  const colorText = isDark ? colors.White : colors.Black

  const [triggerPostOrder, result] = usePostOrderMutation()

  const onConfirmOrder = () => {
    triggerPostOrder({
      items: cart,
      user: 'Bruno',
      total
    })
  }

  if (cart.length == 0) {
    return (
      <View style={styles.container}>
        <Text>
          Tu carrito está vacio
        </Text>
      </View>
    )
  } else {
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
          <ButtonCustom onPress={onConfirmOrder}>
            <Text style={{ color: colorText }}>
              Checkout
            </Text>
          </ButtonCustom>
        </View>
      </View>
    )
  }

}

export default Cart

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,

  },
  totalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    gap: 20,
    flex: 2,
    width: '100%'
  }
})