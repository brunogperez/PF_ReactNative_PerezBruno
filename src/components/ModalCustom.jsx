import { FlatList, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'
import { MaterialIcons } from '@expo/vector-icons'
import ButtonCustom from '../components/ButtonCustom'
import { useSelector } from 'react-redux'

const ModalCustom = ({ modalVisible, order, handleCloseModal }) => {

  const { localId, user } = useSelector((state) => state.authReducer.value)
  const { order: orderItem } = order

  const date = new Date(order.date).toLocaleDateString()

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <ButtonCustom
              style={styles.buttonClose}
              onPress={handleCloseModal}>
              <MaterialIcons name="close" size={32} color="red" />
            </ButtonCustom>
            <Text style={styles.text2}>Purcharse date: {date}</Text>
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
            <Text style={styles.text}>Total: ${order.total}</Text>
          </View>
        </View>
      </Modal>
    </View>

  )
}

export default ModalCustom

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '80%',
    gap: 20,
    backgroundColor: colors.Maize,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
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