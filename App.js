import { View, StyleSheet } from 'react-native'
import { useState } from 'react'
import uuid from 'react-native-uuid'
import ModalCustom from './src/components/modal/ModalCustom.jsx'
import Input from './src/components/Input.jsx/Input.jsx'
import ItemList from './src/components/ItemList/ItemList.jsx'


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
      <ItemList
        handleModal={handleModal}
        itemList={itemList}
      />
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
  }
})