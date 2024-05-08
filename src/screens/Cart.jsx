import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CartItem from '../components/CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { usePostOrderMutation } from '../services/shopService'
import { colors } from '../constants/colors'
import { clearCart } from '../features/cart/cartSlice'
import ButtonCustom from '../components/ButtonCustom'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

const Cart = () => {
  
  // Hook para utilizar el trigger con la función para gatillar el post de la compra
  const [triggerPostOrder, result] = usePostOrderMutation()
  
  //Obtenemos la altura del bottomTabNavigator a partir de un hook para poder realizar un paddingBottom y no componentes
  const tabBarHeight = useBottomTabBarHeight()

  const dispatch = useDispatch()


  const { cart, total } = useSelector((state) => state.cartReducer.value)

  const isDark = useSelector(state => state.globalReducer.value.darkMode)

  const colorText = isDark ? colors.White : colors.Black


  //Función para confirmar la compra 
  const onConfirmOrder = () => {
    triggerPostOrder({
      items: cart,
      user: 'Bruno',
      total
    })
  }

  //Función para  vaciar el carrito
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
      <View style={{ ...styles.container, paddingBottom: tabBarHeight }}>
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
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  totalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    gap: 20,
    width: '100%'
  }
})