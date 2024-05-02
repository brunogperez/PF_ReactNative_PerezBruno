import { StyleSheet } from 'react-native'
import { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigator from './BottomTabNavigator'
import AuthStackNavigator from './AuthStackNavigator'
import { useSelector } from 'react-redux'

const Stack = createNativeStackNavigator()

const Navigator = () => {

  const { user } = useSelector(state => state.authReducer.value)



  return (
    <NavigationContainer  >
      {user ? <BottomTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  )
}

export default Navigator

const styles = StyleSheet.create({

})