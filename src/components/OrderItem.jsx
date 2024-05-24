import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Card from '../components/Card'
import ButtonCustom from '../components/ButtonCustom'
import { FontAwesome5 } from '@expo/vector-icons'

import { useSelector } from 'react-redux'
import { MaterialIcons } from '@expo/vector-icons'
import LayoutCustom from './LayoutCustom'
import { colors } from '../constants/colors'

const OrderItem = ({ order }) => {

  const { localId, user } = useSelector((state) => state.authReducer.value)

  const [modalVisible, setModalVisible] = useState(false)

  const { order: orderItem } = order

  return (
    <LayoutCustom style={styles.card} onPress={() => { }}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <ButtonCustom
              style={styles.buttonClose}
              onPress={() => setModalVisible(!modalVisible)}>
              <MaterialIcons name="close" size={32} color="red" />
            </ButtonCustom>

            <Text style={styles.text2}>Owner: {user}</Text>
            <Text style={styles.text2}>ID User: {localId} </Text>
            <Text style={styles.text}>Items: </Text>
            <FlatList
              data={orderItem}
              keyExtractor={orderItem => orderItem.id}
              renderItem={({ item }) => {
                return (
                  <View>
                    <Text style={styles.text}>{item.quantity} x {item.title}</Text>
                  </View>
                )
              }}
            />
            <Text style={styles.text}>${order.total}</Text>
          </View>
        </View>
      </Modal>

      <View style={styles.cardContainer}>
        <View>
          <Text style={styles.text}>{order.date}</Text>
          <Text style={styles.text2}>${order.total}</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 19,
    alignItems: 'flex-start'
  },
  text2: {
    fontSize: 14,
  },
  icon: {
    marginHorizontal: 15
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  btnSearch: {
    backgroundColor: 'transparent',

    justifyContent: 'center'
  },
  modalView: {
    height: '50%',
    width: '80%',
    gap: 10,
    backgroundColor: colors.White,
    borderRadius: 20,
    padding: 20,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: 'transparent',
    bottom: '5%',
    left: '40%'
  },


})