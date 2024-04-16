import { Image, StyleSheet, Text } from 'react-native'
import React from 'react'
import Card from './Card'
import { colors } from '../constants/colors'

const ProductItem = ({ product }) => {
  return (
    <Card style={styles.styleProduct}>
      <Text style={styles.textCategory}> {product.title}</Text>
      <Image
        resizeMode='cover'
        style={styles.image}
        source={{ uri: product.images[0] }}
      />
    </Card>
  )
}

export default ProductItem

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 80,
    borderRadius: 8,
    margin:10
  },
  styleProduct: {
    paddingLeft: 10,
    flexDirection: 'row',
    height: 120,
    width: 350,
    justifyContent: 'space-between',
    margin: 10,
    alignItems:'center'
  },
  textCategory: {
    
    color: colors.textLight
  }
})
