import { StyleSheet, View } from 'react-native'
import React from 'react'
import HomeStackNavigator from './HomeStackNavigator'
import CartStackNavigator from './CartStackNavigator'
import OrderStackNavigator from './OrderStackNavigator'
import { FontAwesome5 } from '@expo/vector-icons'
import { colors } from '../constants/colors'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Header from '../components/Header'

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
      })}
    >
      <Tab.Screen
        name="Shop"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <FontAwesome5 name="store" size={focused ? 28 : 20} color={focused ? "black" : colors.Chetsnut}
                />
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
                <FontAwesome5 name="shopping-cart" size={focused ? 28 : 20}  color={focused ? 'black' : colors.Chetsnut} />
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
                <FontAwesome5 name="receipt" size={focused ? 28 : 20}  color={focused ? 'black' : colors.Chetsnut} />
              </View>
            )
          },
        }}
      />
    </Tab.Navigator>
  )
}
export default BottomTabNavigator

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    position:'absolute',
    bottom:10,
    borderRadius:10,
    width:'90%',
    left:20,
    backgroundColor:'#dcdcdc'
  },
})