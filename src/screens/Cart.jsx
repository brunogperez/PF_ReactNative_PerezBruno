import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import CartItem from '../components/CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { usePostOrderMutation, usePostProductsInCartMutation } from '../services/shopService'
import { clearCart } from '../features/cart/cartSlice'
import ButtonCustom from '../components/ButtonCustom'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import LayoutCustom from '../components/LayoutCustom'
import TextCustom from '../components/TextCustom'
import { MaterialIcons } from '@expo/vector-icons'
import { backgroundColors, iconColors } from '../constants/colors'

const Cart = ({ navigation }) => {

  const dispatch = useDispatch()

  const { localId } = useSelector((state) => state.authReducer.value)
  const { cart, total } = useSelector((state) => state.cartReducer.value)

  const today = new Date()
  console.log(today)


  //Obtenemos la altura del bottomTabNavigator a partir de un hook para poder realizar un paddingBottom y no ocultar componentes
  const tabBarHeight = useBottomTabBarHeight()

  // Hook para utilizar el trigger con la función para gatillar el post de la compra
  const [triggerPostOrder, postOrderResult] = usePostOrderMutation()

  const [triggerPostCart, postCartResult] = usePostProductsInCartMutation()



  //Función para confirmar la compra 
  const onConfirmOrder = () => {
    triggerPostOrder({
      order: cart,
      user: localId,
      total: total,
      date: today
    }).then(() => {
      navigation.navigate('PaymentConfirmation', { total, order })
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

  const isDark = useSelector(state => state.globalReducer.value.darkMode)
  const bgColor = isDark ? backgroundColors.Dark : backgroundColors.Light
  const iconColor = isDark ? iconColors.Dark : iconColors.Light

  if (cart.length == 0) {
    return (
      <LayoutCustom style={{ backgroundColor: bgColor, ...styles.container, paddingBottom: tabBarHeight }}>
        <MaterialIcons name="shopping-bag" size={300} color={iconColor} />
        <TextCustom>
          ¡Empezá un carrito de compras!
        </TextCustom>
        <TextCustom>
          Sumá productos y conseguí descuentos especiales
        </TextCustom>
        <ButtonCustom onPress={() => navigation.navigate('Home')} >
          <TextCustom > Descubrí productos </TextCustom>
        </ButtonCustom>
      </LayoutCustom >
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
    justifyContent: 'center',
    gap: 10,

  },
  totalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    gap: 20,
    width: '100%'
  }
})