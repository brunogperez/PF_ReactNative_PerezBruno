import { View, StyleSheet, Text, FlatList, Pressable } from 'react-native'
import { useState } from 'react'
import uuid from 'react-native-uuid'
import ModalCustom from './src/components/modal/ModalCustom.jsx'
import Input from './src/components/Input.jsx/Input.jsx'


const App = () => {

  const [textItem, setTextItem] = useState("")
  const [itemList, setItemList] = useState([])

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
      <Input
        addItem={addItem}
        handleChangeText={handleChangeText}
        textItem={textItem}
      />
      <View style={styles.taskContainer}>
        <FlatList
          style={styles.flatList}
          data={itemList}
          keyExtractor={product => product.id.toString()}
          renderItem={({ item }) =>
            <Pressable style={styles.card} onPressIn={() => handleModal(item)}>
              <Text style={styles.taskText} >
                {item.value}
              </Text>
            </Pressable>
          }
        />
      </View>
      <ModalCustom
        handleCancelModal={handleCancelModal}
        handleDelete={handleDelete}
        itemSelected={itemSelected}
        modalVisible={modalVisible}
      />
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
  }
})