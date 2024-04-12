import { View, Text, Modal, StyleSheet, Pressable } from 'react-native'


export const ModalCustom = (modalVisible, handleCancelModal, handleDelete, itemSelected) => {
  return (
    <Modal visible={modalVisible} animationType='fade'>
      <View style={styles.modalStyle}>
        <View style={styles.modalContainer}>
          <View style={styles.textContainer}>
            <Text >Estas seguro que deseas eliminar?</Text>
          </View >
          <View style={styles.textContainer}>
            <Text style={styles.textModal}>{itemSelected}</Text>
          </View>
          <View style={styles.btnContainer}>
            <Pressable onPress={handleDelete}>
              <Text>Delete</Text>
            </Pressable>
            <Pressable onPress={handleCancelModal}>
              <Text>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default ModalCustom

const styles = StyleSheet.create({
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
  btnContainer: {
    flexDirection: 'row',
    gap: 20
  },
  textModal: {
    fontWeight: 'bold',
    fontSize: 20
  }
})