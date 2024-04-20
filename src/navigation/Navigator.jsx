import { Button, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import Home from '../screens/Home'
import ItemListCategory from '../screens/ItemListCategory'
import ItemDetail from '../screens/ItemDetail'
import Header from '../components/Header'
import { colors } from '../constants/colors'
import BottomTabNavigator from './BottomTabNavigator'

const Stack = createNativeStackNavigator()

const Navigator = () => {
  return (
    <NavigationContainer style={styles.container}>
      <BottomTabNavigator />
    </NavigationContainer>
  )
}

export default Navigator

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})