import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from '../screens/Profile'
import ImageSelector from '../screens/ImageSelector'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignUpScreen'
import LocationSelector from '../screens/LocationSelector'


const Stack = createNativeStackNavigator()


const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='Login'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name='MyProfile'
        component={Profile}
      />
      <Stack.Screen
        name='Login'
        component={LoginScreen}
      />
      <Stack.Screen
        name='SignUp'
        component={SignupScreen}
      />
      <Stack.Screen
        name='ImageSelector'
        component={ImageSelector}
      />
      <Stack.Screen
        name='LocationSelector'
        component={LocationSelector}
      />
    </Stack.Navigator>
  )
}

export default ProfileStackNavigator

const styles = StyleSheet.create({})