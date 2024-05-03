import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigator from './BottomTabNavigator'


const Stack = createNativeStackNavigator()

const Navigator = () => {

  return (
    <NavigationContainer  >
      <BottomTabNavigator />
    </NavigationContainer>
  )
}

export default Navigator

const styles = StyleSheet.create({

})