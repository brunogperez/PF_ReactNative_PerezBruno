import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native'
import Navigator from './src/navigation/Navigator'
import { Provider } from 'react-redux'
import store from './src/store'


const App = () => {

  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <StatusBar backgroundColor="transparent" translucent />
        <Navigator />
      </Provider>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
 
})