import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import Card from './Card'
import { colors } from '../constants/colors'
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
    height: 100,
    width: '90%',
    marginTop: 40,
    borderRadius: 10,
    alignSelf: 'center',
    borderWidth:2,
    
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
  }
})
