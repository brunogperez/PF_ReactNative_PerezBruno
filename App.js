import { View, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native'
import { useState } from 'react'
import uuid from 'react-native-uuid'
import ModalCustom from './src/components/ModalCustom.jsx'
import Input from './src/components/Input.jsx'
import ItemList from './src/components/ItemList.jsx'
import Home from './src/screens/Home.jsx'
import Header from './src/components/Header.jsx'
import { colors } from './src/constants/colors.js'
import ItemListCategory from './src/screens/ItemListCategory.jsx'
import ItemDetail from './src/screens/ItemDetail.jsx'


const App = () => {

  /*   const [textItem, setTextItem] = useState("")
    const [itemList, setItemList] = useState([])
  
    const [modalVisible, setModalVisible] = useState(false)
    const [itemSelected, setItemSelected] = useState({})
   */
  const [categorySelected, setCategorySelected] = useState('')
  const [itemIDSelected, setItemIDSelected] = useState('')

  /* const addItem = () => {
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
  } */

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      {!categorySelected ? (
        <Home setCategorySelected={setCategorySelected} />
      ) :

        !itemIDSelected ?
          (
            <ItemListCategory
              categorySelected={categorySelected}
              setCategorySelected={setCategorySelected}
              setItemIDSelected={setItemIDSelected} />
          ) : (
            <ItemDetail
              idSelected={itemIDSelected}
              setProductSelected={setItemIDSelected}
            />
          )
      }

      {/*       <Input
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
      /> */}
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    width: '100%',
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: colors.Jasper,
    flex: 1
  }
})