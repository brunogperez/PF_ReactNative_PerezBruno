import { TextInput, View, StyleSheet, Text, Button, FlatList, TouchableOpacity, Modal } from 'react-native'
import { useState } from 'react'
import uuid from 'react-native-uuid'
import { ScrollView } from 'react-native-web'


const products = [
  { id: 1, value: 'celular' },
  { id: 2, value: 'auriculares' },
  { id: 3, value: 'joystick' }
]

const App = () => {

  const [textItem, setTextItem] = useState('')
  const [itemList, setItemList] = useState(products)
  const [modalVisible, setModalVisible] = useState(false)
  const [itemSelected, setItemSelected] = useState({})

  const addItem = () => {
    if (textItem == '') return
    setItemList(currentValue => [
      ...currentValue,
      { id: uuid.v4(), value: textItem }
    ])
    setTextItem('')
  }

  const handleChangeText = (text) => setTextItem(text)

  const handleModal = (item) => {
    setItemSelected(item)
    setModalVisible(true)
  }

  const handleDelete = () => {
    const filter = itemList.filter(product => product !== itemSelected)
    setItemList(filter)
    setModalVisible(false)
  }

  const handleCancelModal = () => {
    setModalVisible(false)
    setItemSelected({})
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} onChangeText={handleChangeText} value={textItem} placeholder={'Smartphone'} />
        <Button title='ADD' color='blue' onPress={addItem} />
        <ScrollView />
      </View>
      <View style={styles.taskContainer}>
        <FlatList
          style={styles.flatList}
          data={itemList}
          keyExtractor={product => product.id.toString()}
          renderItem={({ item }) =>
            <TouchableOpacity style={styles.card} onPress={() => handleModal(item)}>
              <Text style={styles.taskText} >
                {item.value}
              </Text>
            </TouchableOpacity>
          }
        />
      </View>
      <Modal visible={modalVisible} animationType='fade'>
        <View style={styles.modalStyle}>
          <View style={styles.modalContainer}>
            <View style={styles.textContainer}>
              <Text >Estas seguro que deseas elimninar?</Text>
            </View >
            <View style={styles.textContainer}>
              <Text style={styles.textModal}>{itemSelected.value}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button title='Borrar' onPress={handleDelete} />
              <Button title='Cancelar' onPress={handleCancelModal} />
            </View>
          </View>
        </View>
      </Modal>
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
    marginTop: 15,
    alignItems: 'center',
    width: '90%'
  },
  card: {
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cccccc',
    width: '100%',
    paddingVertical: 5,
    marginVertical: 10
  },
  taskText: {
    fontWeight: 'bold',
    fontSize: 16
  },
  flatList: {
    width: '90%'
  },
  modalStyle: {
    backgroundColor: 'lightgrey',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '80%',
    alignItems: 'center',
    gap: 20,
    paddingVertical: 20,
    borderRadius: 10
  },
  textContainer: {

  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20
  },
  textModal: {
    fontWeight: 'bold',
    fontSize: 20
  }
})