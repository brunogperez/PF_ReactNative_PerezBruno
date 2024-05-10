import { StyleSheet, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeStackNavigator from './HomeStackNavigator'
import CartStackNavigator from './CartStackNavigator'
import OrderStackNavigator from './OrderStackNavigator'
import ProfileStackNavigator from './ProfileStackNavigator'
import Header from '../components/Header'
import { FontAwesome5 } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../constants/colors'
import { useSelector } from 'react-redux'

const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {

  const { cart } = useSelector((state) => state.cartReducer.value)

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
                <FontAwesome5 name="store" size={focused ? 28 : 20} color={focused ? "black" : colors.CastletonGreen}
                />
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
                <FontAwesome5 name="receipt" size={focused ? 28 : 20} color={focused ? 'black' : colors.CastletonGreen} />
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
                {(cart.length == 0) ?
                  <Ionicons name="cart-outline" size={focused ? 32 : 26} color={focused ? 'black' : colors.CastletonGreen} />
                  :
                  <Ionicons name="cart-sharp" size={focused ? 32 : 26} color={focused ? 'black' : colors.CastletonGreen} />
                }

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
                <Ionicons name="person-circle-sharp" size={focused ? 32 : 26} color={focused ? 'black' : colors.CastletonGreen} />
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