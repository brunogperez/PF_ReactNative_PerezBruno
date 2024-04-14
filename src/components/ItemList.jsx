import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ItemList = ({ handleModal, itemList }) => {
  return (
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
  )
}

export default ItemList

const styles = StyleSheet.create({

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