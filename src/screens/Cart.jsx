import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import CartItem from '../components/CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { usePostOrderMutation, usePostProductsInCartMutation } from '../services/shopService'
import { colors } from '../constants/colors'
import { clearCart } from '../features/cart/cartSlice'
import ButtonCustom from '../components/ButtonCustom'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { FontAwesome5 } from '@expo/vector-icons'
import LayoutCustom from '../components/LayoutCustom'

const Cart = () => {

  //Obtenemos la altura del bottomTabNavigator a partir de un hook para poder realizar un paddingBottom y no ocultar componentes
  const tabBarHeight = useBottomTabBarHeight()

  // Hook para utilizar el trigger con la función para gatillar el post de la compra
  const [triggerPostOrder, postOrderResult] = usePostOrderMutation()

  // Hook para utilizar el trigger con la función para gatillar el update del cart
  const [triggerPostCart, postCartResult] = usePostProductsInCartMutation()


  const dispatch = useDispatch()
  const { user, localId } = useSelector((state) => state.authReducer.value)
  const { cart, total } = useSelector((state) => state.cartReducer.value)

  const isDark = useSelector(state => state.globalReducer.value.darkMode)
  const colorText = isDark ? colors.White : colors.Black

  //useEffect para gatillar una actualización del cart en la DB cada vez que se genere algun cambio en el mismo
  useEffect(() => {
    if (localId) {
      triggerPostCart({ cart, localId })
    }
  }, [cart])

  //Función para confirmar la compra 
  const onConfirmOrder = () => {
    triggerPostOrder({
      items: cart,
      user,
      total
    })

    if (postOrderResult.isSuccess) handleClearCart()
  }

  //Función para  vaciar el carrito
  const handleClearCart = () => {
    dispatch(clearCart())
  }


  // Return condicional
  if (cart.length == 0) {
    return (
      <View style={styles.container}>
        <FontAwesome5 name="question" size={80} color="black" />
        <Text>
          Aun no tienes productos agregados
        </Text>
      </View>
    )
  } else {
    return (
      <LayoutCustom style={{ ...styles.container, paddingBottom: tabBarHeight }}>
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
      </LayoutCustom>
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