import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SignUpScreen from '../screens/SignUpScreen'
import LoginScreen from '../screens/LoginScreen'

const Stack = createNativeStackNavigator()

const FavStackNavigator = () => {
  return (
    <Stack.Navigator
            initialRouteName='Login'
            screenOptions={{
                headerShown: false,   
            }}
        >
      
    </Stack.Navigator>
  )
}


export default FavStackNavigator

const styles = StyleSheet.create({})