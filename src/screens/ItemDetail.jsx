import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import products from '../data/products.json'
import Counter from '../components/Counter'
import { FontAwesome5 } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { colors } from '../constants/colors'

const ItemDetail = ({ route, navigation }) => {

  const { width, height } = useWindowDimensions()

  // Estado para manejar el seteo para el renderizado del producto
  const [product, setProduct] = useState()

  // Estado para manejar la orientación del dispositivo
  const [orientation, setOrientation] = useState('portrait')

  const { productID } = route.params

  useEffect(() => {
    // Función para encontrar el ID del producto
    const productSelected = products.find((product) => product.id === productID)
    // Seteamos el producto 
    setProduct(productSelected)
  }, [productID])

  useEffect(() => {
    // Condicional para comprobar la posición del dispositivo
    if (width > height) setOrientation('landscape')
    else setOrientation('portrait')
  }, [width, height])

  console.log(width)
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
          <View style={(width <= 360) ? styles.imgContainerSM : styles.imgContainerM}>
            <View style={styles.textTitleContainer}>
              <Text style={styles.textTitle} >{product.title}</Text>
            </View>
            {(orientation === 'portrait') ? (
              <Image
                source={{ uri: product.images[0] }}
                style={(width <= 360) ? styles.imageSM : styles.imageM}
                resizeMode='cover'
              />
            ) : (
              <Image
                source={{ uri: product.images[0] }}
                style={(width <= 592) ? styles.imageLandscapeSM : styles.imageLandscapeM}
                resizeMode='cover'
              />
            )}

          </View>
          <View style={orientation === 'portrait' ? styles.textContainer : styles.textContainerLandscape}>
            <View style={styles.textDescription} >
              <Text>{product.description}</Text>
              <Text style={styles.price}>Precio: ${product.price}</Text>
            </View>
            <View style={styles.quantityContainer}>
              <Counter />
              <Pressable style={styles.pressable}>
                <Text style={styles.textPressable}>ADD TO CART</Text>
                {/* <FontAwesome5 name="cart-plus" size={30} color="black" /> */}
              </Pressable>
            </View>
          </View>
        </View>
      ) : null
      }
    </View >
  )
}


export default ItemDetail

const styles = StyleSheet.create({

  mainContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
    padding: 10,
    backgroundColor: colors.Jasper,
    height: '100%',
    width: '100%'
  },
  imgContainerM: {
    backgroundColor: colors.Chetsnut,
    width: '120%',
    paddingBottom: 10,
    gap: 40,
    borderBottomEndRadius:300,
    borderBottomStartRadius: 300,
    top:-10,
    height:'60%'
  },
  imageM: {
    alignSelf: 'center',
    width: '70%',
    height: '70%',
    borderRadius: 250,
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
  pressable: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.Chetsnut,
    padding: 20,
    borderRadius: 100,
  },
  textPressable: {
    color: colors.textLight
  },


  // Estilos para tamaño de movil small

  imgContainerSM: {
    backgroundColor: colors.Chetsnut,
    width: '120%',
    paddingBottom: 40,
    gap: 10,
    borderBottomEndRadius: 400,
    borderBottomStartRadius: 400,
    top:-10,
    height:'60%'
  },
  imageSM: {
    alignSelf: 'center',
    width: 200,
    height: 200,
    borderRadius: 400,
  },
  // Estilos para posición horizontal del dispositivo

  mainContainerLandscape: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 10,
    backgroundColor: colors.Jasper,
    height: '100%'
  },
  textContainerLandscape: {
    width: '60%',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  },
  imageLandscapeM: {
    width: '35%',
    height: '100%',
    borderRadius: 10,

  },
  imageLandscapeSM: {
    width: '40%',
    height: '100%',
    borderRadius: 10
  },
})