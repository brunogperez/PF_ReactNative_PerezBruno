import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from '../screens/Profile'
import ImageSelector from '../screens/ImageSelector'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignUpScreen'


const Stack = createNativeStackNavigator()


const OrderStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='Profile'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name='Profile'
        component={Profile}
      />
      <Stack.Screen
        name='ImageSelector'
        component={ImageSelector}
      />
      <Stack.Screen
        name='Login'
        component={LoginScreen}
      />
      <Stack.Screen
        name='SignUp'
        component={SignupScreen}
      />
    </Stack.Navigator>
  )
}

export default OrderStackNavigator

const styles = StyleSheet.create({})