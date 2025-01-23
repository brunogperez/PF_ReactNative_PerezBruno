import { Image, Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import Card from './Card'

import { useDispatch } from 'react-redux'
import { setItemIDSelected } from '../features/shop/shopSlice'
import TextCustom from './TextCustom'

const ProductItem = ({ product, navigation }) => {

  const dispatch = useDispatch()

  const handleNavigate = () => {
    dispatch(setItemIDSelected(product.title))
    navigation.navigate('ItemDetail', { productID: product.id })
  }
  return (
    <Card style={styles.card}>
      <Pressable style={styles.styleProduct} onPress={handleNavigate}>
        <View style={styles.textContainer}>
          <TextCustom style={styles.textCategory}> {product.title}</TextCustom>
          <TextCustom style={styles.textCategory}>  Precio: ${product.price}</TextCustom>
        </View>
        <Image
          resizeMode='cover'
          style={{...styles.image}}
          source={{ uri: product.images[0] }}
        />
      </Pressable>
    </Card>
  )
}

export default ProductItem

const styles = StyleSheet.create({
  card: {
    height: 100,
    width: '90%',
    marginVertical: 10,
    borderRadius: 10,
    alignSelf: 'center',  
  },
  image: {
    height: 120,
    width: '35%',
    borderRadius: 10,
    marginLeft:10
  },
  styleProduct: {
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textContainer: {
    width: '65%',
  },
  textCategory: {
    marginVertical: 5,
  }
})
