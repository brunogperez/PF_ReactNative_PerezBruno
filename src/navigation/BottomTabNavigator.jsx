import { StyleSheet, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeStackNavigator from './HomeStackNavigator'
import CartStackNavigator from './CartStackNavigator'
import OrderStackNavigator from './OrderStackNavigator'
import ProfileStackNavigator from './ProfileStackNavigator'
import Header from '../components/Header'
import { colors } from '../constants/colors'
import { MaterialIcons } from '@expo/vector-icons'


const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {

  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        header: () => {
          return <Header navigation={navigation} route={route} />
        },
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true
      })}
    >
      <Tab.Screen
        name="Shop"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <MaterialIcons name="home-filled" size={focused ? 32 : 24} color={focused ? colors.Black : colors.DarkGrey} />
              </View>
            )
          },
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrderStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <MaterialIcons name="receipt-long" size={focused ? 32 : 24} color={focused ? colors.Black : colors.DarkGrey} />
              </View>
            )
          },
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <MaterialIcons name="shopping-cart" size={focused ? 32 : 24} color={focused ? colors.Black : colors.DarkGrey} />
              </View>
            )
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <MaterialIcons name="person" size={focused ? 32 : 26} color={focused ? colors.Black : colors.DarkGrey} />
              </View>
            )
          },
        }}
      />
    </Tab.Navigator >
  )
}
export default BottomTabNavigator

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    position: 'absolute',
    bottom: 10,
    borderRadius: 10,
    width: '90%',
    left: 20,
    backgroundColor: '#dcdcdc'
  },
})