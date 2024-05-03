import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Card from '../components/Card'
import { FontAwesome5 } from '@expo/vector-icons'
import { colors } from '../constants/colors'
import { useDispatch, useSelector } from 'react-redux'
import { removeProduct } from '../features/cart/cartSlice'
import ButtonCustom from './ButtonCustom'
import Counter from '../components/Counter'

const CartItem = ({ cartItem }) => {

  const dispatch = useDispatch()

  const handleRemove = () => {
    
    dispatch(removeProduct(cartItem.id))
  }

  return (
    <Card style={styles.card} onPress={() => { }}>
      <ButtonCustom onPress={handleRemove}>
        <FontAwesome5 name='trash' size={24} color='black' style={styles.icon} />
      </ButtonCustom>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{cartItem.title} ({cartItem.quantity})</Text>
        <Text style={styles.text2}>{cartItem.brand}</Text>
        <Text style={styles.text2}>${cartItem.price}</Text>
      </View>
      <Counter cartItem={{...cartItem}} />
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
    flexDirection: 'column',
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