import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native'
import Navigator from './src/navigation/Navigator'
import { colors } from './src/constants/colors'
import { useFonts } from 'expo-font'

const App = () => {

  const [fontsLoaded, fontError] = useFonts({
    Square: require('./assets/Square.ttf'),
  })

  if (!fontsLoaded || fontError) {
    return null
  }

  if (fontsLoaded && !fontError) {
    return (
      <SafeAreaView style={styles.container}>
        <Navigator />
      </SafeAreaView>
    )
  }

}

export default App

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: colors.Chetsnut,
    flex: 1
  }
})