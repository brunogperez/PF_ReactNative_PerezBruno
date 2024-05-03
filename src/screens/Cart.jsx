import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CartItem from '../components/CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { usePostOrderMutation } from '../services/shopService'
import { colors } from '../constants/colors'
import { clearCart } from '../features/cart/cartSlice'
import ButtonCustom from '../components/ButtonCustom'

const Cart = () => {

  const dispatch = useDispatch()
  
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

  const handleClearCart = () => {
    dispatch(clearCart())
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
        <ButtonCustom onPress={handleClearCart}>
          <Text style={{ color: colorText }}>
            Clear Cart
          </Text>
        </ButtonCustom>
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