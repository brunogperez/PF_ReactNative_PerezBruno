import { Button, Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import products from '../data/products.json'
import Counter from '../components/Counter'
import { FontAwesome5 } from '@expo/vector-icons';

const ItemDetail = ({ idSelected, setProductSelected }) => {

  const { width, height } = useWindowDimensions()
  console.log(width)

  // Estado para manejar el seteo para el renderizado del producto
  const [product, setProduct] = useState()

  // Estado para manejar la orientación del dispositivo
  const [orientation, setOrientation] = useState('portrait')

  console.log(orientation)
  useEffect(() => {
    // Función para encontrar el ID del producto
    const productSelected = products.find((product) => product.id === idSelected)
    // Seteamos el producto 
    setProduct(productSelected)
  }, [idSelected])

  useEffect(() => {
    // Condicional para comprobar la posición del dispositivo
    if (width > height) setOrientation('landscape')
    else setOrientation('portrait')
  }, [width, height])

  //Landscape = Horizontal
  //Portrait = Vertical

  return (
    <View>
      {product ? (
        <View
          style={
            orientation === 'portrait' ?
              styles.mainContainer
              : styles.mainContainerLandscape
          }
        >
          <Image
            source={{ uri: product.images[0] }}
            style={orientation === 'portrait' ? styles.image : (width <= 592 && orientation == 'landscape') ? styles.imageLandscapeSM : styles.imageLandscapeM}
            resizeMode='cover'
          />
          <View style={orientation === 'portrait' ? styles.textContainer : styles.textContainerLandscape}>
            <View style={styles.textTitleContainer}>
              <Text style={styles.textTitle} >{product.title}</Text>
            </View>
            <View style={styles.textDescription} >
              <Text>{product.description}</Text>
              <Text style={styles.price}>${product.price}</Text>
            </View>
            <View style={styles.quantityContainer}>
              <Counter />
              <Pressable>
                <FontAwesome5 name="cart-plus" size={24} color="black" />
              </Pressable>
            </View>
          </View>
          {/* <Button title='go back' onPress={() => setProductSelected('')}></Button> */}
        </View>
      ) : null}
    </View>
  )
}

export default ItemDetail

const styles = StyleSheet.create({

  mainContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 20,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 20
  },
  textContainer: {
    flexDirection: 'column',
  },
  textTitleContainer: {
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 20,
    margin: 10
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  price: {
    width: '100%',
    fontSize: 20,
    marginVertical: 10
  },

  // Estilos para posición horizontal del dispositivo

  mainContainerLandscape: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 10
  },
  textContainerLandscape: {
    width: '60%',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  },
  imageLandscapeM: {
    width: '35%',
    height: '120%',
    borderRadius: 10,
   
  },
  imageLandscapeSM: {
    width: '40%',
    height: '100%',
    borderRadius: 10
  },
})