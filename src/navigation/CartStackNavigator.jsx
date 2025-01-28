import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Cart from '../screens/Cart'
import PaymentConfirmation from '../screens/PaymentConfirmation'

const Stack = createNativeStackNavigator()

const CartStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="CartScreen"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="CartScreen" component={Cart} />
      <Stack.Screen
        component={PaymentConfirmation}
        name='PaymentConfirmation'
      />
    </Stack.Navigator>
  )
}

export default CartStackNavigator

const styles = StyleSheet.create({})