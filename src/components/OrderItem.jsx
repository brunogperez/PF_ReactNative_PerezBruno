import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Card from '../components/Card'
import { FontAwesome5 } from '@expo/vector-icons'
import { colors } from '../constants/colors'

const OrderItem = ({ order }) => {

  const total = order.items.reduce(
    (acc, currentItem) => (acc += currentItem.price * currentItem.quantity),
    0
  )

  return (
    <Card style={styles.card} onPress={() => { }}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {new Date(order.createdAt).toLocaleString()}
        </Text>
        <Text style={styles.text2}>${total}</Text>
      </View>
      <Pressable>
        <FontAwesome5 name="search" size={24} color="black" style={styles.icon} />
      </Pressable>
    </Card>
  )
}

export default OrderItem

const styles = StyleSheet.create({
  card: {
    height: 100,
    backgroundColor: colors.light,
    padding: 5,
    margin: 5,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '90%'
  },
  textContainer: {
    width: "70%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 5
  },
  text: {
    fontSize: 19,
  },
  text2: {
    fontSize: 14,
  },
  icon: {
    marginHorizontal: 15
  }
})