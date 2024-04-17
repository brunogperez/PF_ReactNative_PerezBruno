import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons';

const Counter = () => {

  const [counter, setCounter] = useState(1)

  const addUnit = () => {
    setCounter(counter + 1)
  }
  const subtractUnit = () => {
    setCounter(counter - 1)
  }

  return (
    <View style={styles.counterContainer}>
      <Pressable style={styles.icon} onPress={subtractUnit}>
        <FontAwesome5 name="minus" size={20} color="black" />
      </Pressable>
      <Text style={styles.textCounter}>{counter}</Text>
      <Pressable style={styles.icon} onPress={addUnit}>
        <FontAwesome5 name="plus" size={20} color="black" />
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
    marginHorizontal: 10,
    borderWidth:1,
    borderRadius:8,
    padding:7,
    gap:10
  },
  icon: {
    marginHorizontal: 5
  },
  textCounter:{
    width:'20%',
    fontSize:20,
    textAlign:'center'
  }
})