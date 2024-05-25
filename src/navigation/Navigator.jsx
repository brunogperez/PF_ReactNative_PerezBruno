import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigator from './BottomTabNavigator'


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