import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import products from '../data/products.json'
import Counter from '../components/Counter'
import { colors } from '../constants/colors'
import { MaterialIcons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../features/cart/cartSlice'
import Card from '../components/Card'


const ItemDetail = ({ route, navigation }) => {


  const dispatch = useDispatch()

  const isDark = useSelector(state => state.globalReducer.value.darkMode)

  const bgColor = isDark ? colors.Black : colors.MintGreen
  const bgimage = isDark ? colors.DarkGreen : colors.Mint
  const colorText = isDark ? colors.White : colors.Black

  const addProduct = () => {
    dispatch(addToCart(product))
  }

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

  //Landscape = Horizontal
  //Portrait = Vertical

  return (
    <View>
      <Pressable onPress={() => navigation.goBack()} style={styles.goBack}>
        <MaterialIcons name="arrow-back" size={30} style={styles.colorIcons} />
      </Pressable>
      {product ? (
        <View
          style={
            orientation === 'portrait' ?
              { backgroundColor: bgColor, ...styles.mainContainer }
              : { backgroundColor: bgColor, ...styles.mainContainerLandscape }
          }
        >
          <Card style={(width <= 360) ? { backgroundColor: bgimage, ...styles.imgContainerSM } : { backgroundColor: bgimage, ...styles.imgContainerM }}>
            <View style={styles.textTitleContainer}>
              <Text style={{ color: colorText ,...styles.textTitle}} >{product.title}</Text>
            </View>
            <Image
              source={{ uri: product.images[0] }}
              style={(width <= 360) ? styles.imageSM : styles.imageM}
              resizeMode='cover'
            />
          </Card>
          <View style={orientation === 'portrait' ? styles.textContainer : styles.textContainerLandscape}>
            <View >
              <Text style={{ color: colorText }}>{product.description}</Text>
              <Text style={{ color: colorText ,...styles.price}}>Precio: ${product.price}</Text>
            </View>
            <View style={(width <= 360) ? styles.quantityContainerSM : styles.quantityContainerM}>
              <Pressable style={{ backgroundColor: bgimage,...styles.pressable}} onPress={() => dispatch(addProduct)}>
                <Text style={{ color: colorText }}>ADD TO CART</Text>
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
    gap: 5,
    padding: 10,
    height: '100%',
    width: '100%',

  },
  imgContainerM: {
    width: '120%',
    paddingBottom: 10,
    gap: 40,
    borderBottomEndRadius: 300,
    borderBottomStartRadius: 300,
    top: -20,
    height: '60%'
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
  quantityContainerM: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',

  },
  price: {
    width: '100%',
    fontSize: 20,
    marginVertical: 10
  },
  pressable: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 100,
  },
  goBack: {
    position: 'absolute',
    alignItems: 'center',
    left: '5%',
    top: '2%',
    zIndex: 1
  },
  colorIcons: {
    color: colors.light
  },

  // Estilos para tamaño de movil small

  imgContainerSM: {
    backgroundColor: 'white',
    width: '120%',
    paddingBottom: 10,
    gap: 10,
    borderBottomEndRadius: 400,
    borderBottomStartRadius: 400,
    top: -10,
    height: '50%',

  },
  imageSM: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    borderRadius: 400,
  },
  quantityContainerSM: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    top: -20
  },
  // Estilos para posición horizontal del dispositivo

  mainContainerLandscape: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 10,

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