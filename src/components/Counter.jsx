import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import { colors } from '../constants/colors'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from '../features/counter/counterSlice'

const Counter = () => {

  const count = useSelector(state => state.counterReducer.value)

  const dispatch = useDispatch()

  // Por el momento definimos el stock con una cantidad harcodeada para luego manejar el estado del
  // pressable con la cantidad obtenida por redux
  const stock = 25

  return (
    <View style={styles.counterContainer}>
      <Pressable style={styles.pressable} onPress={() => dispatch(decrement())} disabled={Boolean(count === 0)}>
        <FontAwesome5 name="minus" size={20} color={colors.light} />
      </Pressable>
      <Text style={styles.textCounter}>{count}</Text>
      <Pressable style={styles.pressable} onPress={() => dispatch(increment())} disabled={Boolean(count >= stock)}>
        <FontAwesome5 name="plus" size={20} color={colors.light} />
      </Pressable>
    </View>
  )
}

export default Counter

const styles = StyleSheet.create({
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'left',
    marginVertical: 15,
    gap: 10,
  },
  pressable: {
    backgroundColor: colors.Chetsnut,
    padding: 10,
    borderRadius: 100,
  },
  textCounter: {
    width: '20%',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})