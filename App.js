import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import Navigator from "./src/navigation/Navigator";
import { Provider } from "react-redux";
import store from "./src/store";
import { initSQLiteDB } from "./src/persistence";


//Funcion IIFE para iniciar DB de SQLite y que no sea necesario loguearse cada vez que se inicia la app
(async () => {
  try {
    if (Platform.OS !== "web") {
      const response = await initSQLiteDB();
    }
  } catch (error) {}
})();

const App = () => {


  return (
    <SafeAreaView style={styles.container}>
        <Provider store={store}>
        <StatusBar  />
        <Navigator />
    </Provider>
      </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});