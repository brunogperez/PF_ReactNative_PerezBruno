import { StyleSheet, View } from 'react-native'
import React from 'react'
import Card from '../components/Card'
import { FontAwesome5 } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'
import { removeProduct } from '../features/cart/cartSlice'
import ButtonCustom from './ButtonCustom'
import Counter from '../components/Counter'
import TextCustom from './TextCustom'


const CartItem = ({ cartItem }) => {

  const dispatch = useDispatch()

  const handleRemove = () => {
    dispatch(removeProduct(cartItem.id))
  }

  return (
    <Card style={styles.card} onPress={() => { }}>
      <View style={styles.textContainer}>
        <TextCustom style={styles.title}>{cartItem.title}</TextCustom>
        <TextCustom style={styles.price}>${cartItem.price}</TextCustom>
      </View>
      <Counter cartItem={{ ...cartItem }} />
      <ButtonCustom onPress={handleRemove} style={styles.btnRemove}>
        <FontAwesome5 name='trash' size={20} color='red' style={styles.icon} />
      </ButtonCustom>
    </Card>
  )
}

export default CartItem

const styles = StyleSheet.create({
  card: {
    height: 100,
    padding: 5,
    margin: 5,
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
    fontSize: 18,
  },
  price: {
    fontSize: 16,
  },
  btnRemove: {
    backgroundColor: 'transparent',
    justifyContent: 'flex-start'
  }
})