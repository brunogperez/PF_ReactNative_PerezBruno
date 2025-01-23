import { StyleSheet, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './HomeStackNavigator';
import CartStackNavigator from './CartStackNavigator';
import OrderStackNavigator from './OrderStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          ...styles.tabBar,
          borderTopWidth: 0,
        },
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        lazy: false,
      }}
    >
      <Tab.Screen
        name="Shop"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <MaterialIcons
                name="home-filled"
                size={focused ? 32 : 24}
                color={focused ? colors.Black : colors.DarkGrey}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrderStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <MaterialIcons
                name="receipt-long"
                size={focused ? 32 : 24}
                color={focused ? colors.Black : colors.DarkGrey}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <MaterialIcons
                name="shopping-cart"
                size={focused ? 32 : 24}
                color={focused ? colors.Black : colors.DarkGrey}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <MaterialIcons
                name="person"
                size={focused ? 32 : 26}
                color={focused ? colors.Black : colors.DarkGrey}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabBar: {
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    overflow: 'hidden',
    position: 'absolute',
  },
});
