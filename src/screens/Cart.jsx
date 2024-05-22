import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import CartItem from '../components/CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { usePostOrderMutation, usePostProductsInCartMutation } from '../services/shopService'
import { clearCart } from '../features/cart/cartSlice'
import ButtonCustom from '../components/ButtonCustom'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { FontAwesome5 } from '@expo/vector-icons'
import LayoutCustom from '../components/LayoutCustom'
import TextCustom from '../components/TextCustom'

const Cart = () => {

  const dispatch = useDispatch()
  const { localId } = useSelector((state) => state.authReducer.value)
  const { cart, total } = useSelector((state) => state.cartReducer.value)

  //Obtenemos la altura del bottomTabNavigator a partir de un hook para poder realizar un paddingBottom y no ocultar componentes
  const tabBarHeight = useBottomTabBarHeight()

  // Hook para utilizar el trigger con la función para gatillar el post de la compra
  const [triggerPostOrder, postOrderResult] = usePostOrderMutation()

  const [triggerPostCart, postCartResult] = usePostProductsInCartMutation()

  //Función para confirmar la compra 
  const onConfirmOrder = () => {
    triggerPostOrder({
      order: cart,
      localId,
    })
  }

  //useEffect para gatillar una actualización del cart en la DB cada vez que se genere algun cambio en el mismo
  useEffect(() => {
    if (localId) {
      triggerPostCart({ cart, localId })
    }
  }, [cart])

  useEffect(() => {
    if (postOrderResult.isSuccess) handleClearCart()
  }, [postOrderResult.isLoading])

  //Función para  vaciar el carrito
  const handleClearCart = () => {
    dispatch(clearCart())
  }

  if (cart.length == 0) {
    return (
      <LayoutCustom style={styles.container}>
        <FontAwesome5 name="question" size={80} color="black" />
        <TextCustom>
          Aun no tienes productos agregados
        </TextCustom>
      </LayoutCustom>
    )
  } else {
    return (
      <LayoutCustom style={{ ...styles.container, paddingBottom: tabBarHeight }}>
        <ButtonCustom onPress={handleClearCart}>
          <TextCustom > Clear Cart </TextCustom>
        </ButtonCustom>
        <FlatList
          data={cart}
          keyExtractor={product => product.id}
          renderItem={({ item }) => {
            return (<CartItem cartItem={item} />)
          }}
        />
        <View style={styles.totalContainer}>
          <TextCustom>Total: ${total}</TextCustom>
          <ButtonCustom onPress={onConfirmOrder}>
            <TextCustom > Checkout </TextCustom>
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