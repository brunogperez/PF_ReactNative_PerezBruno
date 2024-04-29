import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native'
import Navigator from './src/navigation/Navigator'
import { colors } from './src/constants/colors'
import { Provider } from 'react-redux'
import store from './src/store'

const App = () => {



  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <Navigator />
      </Provider>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor:colors.MintGreen,
    flex: 1,
  }
})