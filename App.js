import { Button, TextInput, View, StyleSheet, Text } from 'react-native'

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} />
        <Button title='ADD' color='blue' />
      </View>
      <View style={styles.taskContainer}>
        <View style={styles.card}>
          <Text style={styles.taskText} >
            Item
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.taskText}>
            Item
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.taskText}>
            Item
          </Text>
        </View>
      </View>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: 'lightblue',
    flex: 1
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    
  },
  textInput: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    width: 250,
    fontSize: 16,
  },
  taskContainer: {
    borderWidth: 1,
    marginTop: 15,
    alignItems: 'center',
    width: '90%'
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cccccc',
    width: '90%',
    paddingVertical: 5,
    marginVertical: 10
  },
  taskText: {
    fontWeight: 'bold',
    fontSize: 16
  }

})