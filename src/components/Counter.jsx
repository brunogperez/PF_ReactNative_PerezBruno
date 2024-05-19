import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import { colors } from '../constants/colors'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from '../features/cart/cartSlice'
import TextCustom from './TextCustom'


const Counter = ({ cartItem }) => {

  const dispatch = useDispatch()

  // Por el momento definimos el stock con una cantidad harcodeada para luego manejar el estado del
  // pressable con la cantidad obtenida por redux
  const stock = cartItem.stock

  const handleIncrement = () => {
    dispatch(increment(cartItem.id))
  }
  const handleDecrement = () => {
    dispatch(decrement(cartItem.id))
  }

  const isDark = useSelector(state => state.globalReducer.value.darkMode)
  const colorIcon = isDark ? colors.White : colors.Black

  return (
    <View style={styles.counterContainer}>

      <Pressable style={styles.pressable} onPress={handleDecrement} disabled={Boolean(cartItem.quantity <= 1)}>
        <FontAwesome5 name="minus" size={15} color={colorIcon} />
      </Pressable>

      <TextCustom style={{ ...styles.textCounter }}>{cartItem.quantity}</TextCustom>

      <Pressable style={styles.pressable} onPress={handleIncrement} disabled={Boolean(cartItem.quantity >= stock)}>
        <FontAwesome5 name="plus" size={15} color={colorIcon} />
      </Pressable>

    </View>
  )
}

export default Counter

const styles = StyleSheet.create({
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
    gap: 20,
  },
  pressable: {
    padding: 3,
    borderRadius: 100,
  },
  textCounter: {
    width: '20%',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  }
})