import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SignUpScreen from '../screens/SignUpScreen'
import LoginScreen from '../screens/LoginScreen'

const Stack = createNativeStackNavigator()

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
            initialRouteName='Login'
            screenOptions={{
                headerShown: false,   
            }}
        >
      <Stack.Screen
        component={LoginScreen}
        name='Login'
      />
      <Stack.Screen
        component={SignUpScreen}
        name='SignUp'
      />
    </Stack.Navigator>
  )
}


export default AuthStackNavigator

const styles = StyleSheet.create({})