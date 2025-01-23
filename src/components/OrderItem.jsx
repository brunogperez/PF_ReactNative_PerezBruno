import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import { backgroundColors, colors, iconColors } from '../constants/colors'
import LayoutCustom from './LayoutCustom'
import ButtonCustom from '../components/ButtonCustom'
import ModalCustom from '../components/ModalCustom'
import TextCustom from './TextCustom'
import Card from './Card'

const OrderItem = ({ order }) => {

  const [modalVisible, setModalVisible] = useState(false)

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  const isDark = useSelector(state => state.globalReducer.value.darkMode)
  const bgColor = isDark ? backgroundColors.Dark : backgroundColors.Light
  const iconColor = isDark ? iconColors.Dark : iconColors.Light
  
  return (
    <Card style={styles.card} >
      <ModalCustom
        handleCloseModal={handleCloseModal}
        modalVisible={modalVisible}
        order={order}
      />
      <View style={styles.cardContainer}>
        <View>
          <TextCustom style={styles.text}>{order.date}</TextCustom>
          <TextCustom style={styles.text2}>Total: ${order.total}</TextCustom>
        </View>
        <ButtonCustom onPress={() => setModalVisible(true)} style={styles.btnSearch}>
          <FontAwesome5 name='search' size={24} color={iconColor} />
        </ButtonCustom>
      </View>
    </Card >
  )
}

export default OrderItem

const styles = StyleSheet.create({
  card: {
    padding: 10,  
    borderRadius: 20,
    flexDirection: 'row',
    alignSelf: 'center',
    width: '90%',
    margin: 10,
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