import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Card from '../components/Card'
import { FontAwesome5 } from '@expo/vector-icons'
import { colors } from '../constants/colors'
import { useDispatch, useSelector } from 'react-redux'
import { removeProduct } from '../features/cart/cartSlice'

const CartItem = ({ cartItem }) => {

  const { cart } = useSelector((state) => state.cartReducer.value)

  const dispatch = useDispatch()

  const handleRemove = () => {
    dispatch(removeProduct(cartItem.id))
  }

  return (
    <Card style={styles.card} onPress={() => { }}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{cartItem.title} ({cartItem.quantity})</Text>
        <Text style={styles.text2}>{cartItem.brand}</Text>
        <Text style={styles.text2}>${cartItem.price}</Text>
      </View>
      <Pressable onPress={handleRemove}>
        <FontAwesome5 name='trash' size={24} color='black' style={styles.icon} />
      </Pressable>
    </Card>
  )
}

export default CartItem

const styles = StyleSheet.create({
  card: {
    height: 100,
    backgroundColor: colors.Mint,
    padding: 5,
    margin: 5,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '90%'
  },
  textContainer: {
    width: "60%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
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