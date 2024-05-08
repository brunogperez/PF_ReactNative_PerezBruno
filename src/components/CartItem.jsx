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
      <View style={styles.textContainer}>
        <Text style={styles.title}>{cartItem.title}</Text>
        <Text style={styles.price}>${cartItem.price}</Text>
      </View>
      <Counter cartItem={{ ...cartItem }} />
      <ButtonCustom onPress={handleRemove} style={styles.btnRemove}>
        <FontAwesome5 name='trash' size={20} color='black' style={styles.icon} />
      </ButtonCustom>
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
    alignSelf: 'center',
    width: '95%',
  },
  textContainer: {
    width: "40%",
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: "flex-start",
    marginLeft: 10
  },
  title: {
    fontSize: 20,
  },
  price: {
    fontSize: 16,
  },
  btnRemove:{
    backgroundColor:'transparent'
  }
})