import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import { colors } from '../constants/colors'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from '../features/cart/cartSlice'


const Counter = ({ cartItem }) => {

  const dispatch = useDispatch()

  // Por el momento definimos el stock con una cantidad harcodeada para luego manejar el estado del
  // pressable con la cantidad obtenida por redux
  const stock = 25
  
  const handleIncrement = () => {
    dispatch(increment(cartItem.id))
  }
  const handleDecrement = () => {
    dispatch(decrement(cartItem.id))
  }

  return (
    <View style={styles.counterContainer}>

      <Pressable style={styles.pressable} onPress={handleDecrement} disabled={Boolean(cartItem.quantity == 0)}>
        <FontAwesome5 name="minus" size={15} color={colors.light} />
      </Pressable>

      <Text style={styles.textCounter}>{cartItem.quantity}</Text>

      <Pressable style={styles.pressable} onPress={handleIncrement} disabled={Boolean(cartItem.quantity >= stock)}>
        <FontAwesome5 name="plus" size={15} color={colors.light} />
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
    backgroundColor: colors.Chetsnut,
    padding: 3,
    borderRadius: 100,
  },
  textCounter: {
    width: '20%',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor:colors.White,
    
  }
})