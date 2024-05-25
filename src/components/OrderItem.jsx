import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import { MaterialIcons } from '@expo/vector-icons'
import { colors } from '../constants/colors'
import LayoutCustom from './LayoutCustom'
import ButtonCustom from '../components/ButtonCustom'
import ModalCustom from '../components/ModalCustom'

const OrderItem = ({ order }) => {

  const { localId, user } = useSelector((state) => state.authReducer.value)

  const [modalVisible, setModalVisible] = useState(false)

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  return (
    <LayoutCustom style={styles.card} >

      <ModalCustom
        handleCloseModal={handleCloseModal}
        modalVisible={modalVisible}
        order={order}
      />

      <View style={styles.cardContainer}>
        <View>
          <Text style={styles.text}>{order.date}</Text>
          <Text style={styles.text2}>Total: ${order.total}</Text>
        </View>
        <ButtonCustom onPress={() => setModalVisible(true)} style={styles.btnSearch}>
          <FontAwesome5 name='search' size={24} color='black' />
        </ButtonCustom>
      </View>
    </LayoutCustom >
  )
}

export default OrderItem

const styles = StyleSheet.create({
  card: {
    height: 100,
    borderRadius: 20,
    flexDirection: 'row',
    backgroundColor: colors.WaterGreen,
    alignSelf: 'center',
    width: '90%',
  },
  cardContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 19,
    alignItems: 'flex-start',
    marginHorizontal: 15
  },
  text2: {
    fontSize: 14,
    marginHorizontal: 20
  },
  icon: {
    marginHorizontal: 15
  },
  
  btnSearch: {
    backgroundColor: 'transparent',
    marginHorizontal: 20,
    justifyContent: 'center'
  },



})