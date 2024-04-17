import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import Card from './Card'
import { colors } from '../constants/colors'

const ProductItem = ({ product, setItemIDSelected = () => { } }) => {

  // const { height, width} = useWindowDimensions()

  return (
    <Card style={styles.card}>
      <Pressable style={styles.styleProduct} onPress={() => setItemIDSelected(product.id)}>
        <View style={styles.textContainer}>
        <Text style={styles.textCategory}> {product.title}</Text>
        <Text style={styles.textCategory}> ${product.price}</Text>
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
    marginTop: 20,
    borderRadius: 8,
    borderWidth: 1,
    marginLeft: 1
  },
  image: {
    height: 110,
    width: '35%', // Ancho específico para que la imagen sobresalga de la card. 
    borderRadius: 8,
    borderColor: colors.CaputMortuum,
    marginBottom: 50,
    marginLeft: 10,
    
  },
  styleProduct: {
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textContainer: {
    width: '65%',
  },
  textCategory: {
    marginVertical:5,
    color: colors.textLight
  }
})
