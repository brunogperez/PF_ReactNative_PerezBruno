import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import Card from './Card'
import { colors } from '../constants/colors'
import { useDispatch } from 'react-redux'
import { setItemIDSelected } from '../features/shop/shopSlice'

const ProductItem = ({ product, route, navigation }) => {
  // const { height, width} = useWindowDimensions()

  const dispatch = useDispatch()

  const handleNavigate = () => {
    dispatch(setItemIDSelected(product.title))
    navigation.navigate('ItemDetail', { productID: product.id })
  }
  return (
    <Card style={styles.card}>
      <Pressable style={styles.styleProduct} onPress={handleNavigate}>
        <View style={styles.textContainer}>
          <Text style={styles.textCategory}> {product.title}</Text>
          <Text style={styles.textCategory}>  Precio: ${product.price}</Text>
        </View>
        <Image
          resizeMode='cover'
          style={styles.image}
          source={{ uri: product.images[0] }}
        />
      </Pressable>
    </Card>
  )
}

export default ProductItem

const styles = StyleSheet.create({
  card: {
    height: 120,
    width: '90%',
    marginTop: 30,
    borderRadius: 8,

  },
  image: {
    height: 110,
    width: '35%', // Ancho específico para que la imagen sobresalga de la card. 
    borderRadius: 8,
    borderColor: colors.CaputMortuum,
    marginBottom: 50,
    marginLeft: 20,
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
    color: colors.textLight
  }
})
