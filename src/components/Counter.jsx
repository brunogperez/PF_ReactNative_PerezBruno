import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../constants/colors';

const Counter = () => {

  const [counter, setCounter] = useState(1)

  const addUnit = () => {
    setCounter(counter + 1)
  }
  const subtractUnit = () => {
    setCounter(counter - 1)
  }

  // Por el momento definimos el stock con una cantidad harcodeada para luego manejar el estado del
  // pressable con la cantidad obtenida por redux
  const stock = 25

  return (
    <View style={styles.counterContainer}>
      <Pressable style={styles.pressable} onPress={subtractUnit} disabled={Boolean(counter === 0)}>
        <FontAwesome5 name="minus" size={20} color={colors.light} />
      </Pressable>
      <Text style={styles.textCounter}>{counter}</Text>
      <Pressable style={styles.pressable} onPress={addUnit} disabled={Boolean(counter >= stock)}>
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
    justifyContent: 'center',
    marginHorizontal: 15,
    marginVertical: 15,
    padding: 7,
    gap: 10
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