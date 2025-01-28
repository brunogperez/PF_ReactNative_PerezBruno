import { ActivityIndicator, Image, Platform, StyleSheet, ToastAndroid,  View } from 'react-native'
import React from 'react'
import { backgroundColors, colors } from '../constants/colors'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../features/cart/cartSlice'
import { useGetProductsByIDQuery } from '../services/shopService'
import ButtonCustom from '../components/ButtonCustom'
import GoBackCustom from '../components/GoBackCustom'
import TextCustom from '../components/TextCustom'
import LayoutCustom from '../components/LayoutCustom'
import CustomShapeDivider from '../components/CustomShapeDivider'

const ItemDetail = ({ route, navigation }) => {

  const dispatch = useDispatch()

  const isDark = useSelector(state => state.globalReducer.value.darkMode)
  const { user } = useSelector(state => state.authReducer.value)

  const bgColor = isDark ? backgroundColors.Dark : backgroundColors.Light
  const bgColorImg = isDark ? colors.Orange : colors.Crail

  const { productID } = route.params

  const { data: product, error, isLoading } = useGetProductsByIDQuery(productID)

  const showToast = () => {
    ToastAndroid.show('Product added to cart!',
      ToastAndroid.SHORT,
    )
  }

  const handleAddCart = () => {
    if (!user) {
      navigation.navigate('Profile', { screen: 'Login' })
    } else {
      dispatch(addToCart({ ...product, quantity: 1 }))
      if (Platform.OS !== 'web') showToast()
    }
  }

  return (
    <>
      <GoBackCustom onPress={() => navigation.goBack()} style={styles.goBack} ></GoBackCustom>

      {!isLoading ? (
        <LayoutCustom style={{ ...styles.mainContainer }}>

          <LayoutCustom style={{ ...styles.imgContainerM }}>
            <CustomShapeDivider height={700} style={styles.shape} />
            <View style={styles.textTitleContainer}>
              <TextCustom style={styles.textTitle} >{product.title}</TextCustom>
            </View>
            <Image
              source={{ uri: product.images[0] }}
              style={styles.imageM}
              resizeMode='cover'
            />
          </LayoutCustom>

          <View style={styles.textContainer}>
            <View >
              <TextCustom >{product.description}</TextCustom>
              <TextCustom style={styles.price}>Precio: ${product.price}</TextCustom>
            </View>
            <View style={styles.quantityContainerM}>
              <ButtonCustom onPress={handleAddCart}>
                <TextCustom >ADD TO CART</TextCustom>
              </ButtonCustom>
            </View>
          </View>
        </LayoutCustom>
      ) : (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" />
        </View>
      )
      }
    </ >
  )
}


export default ItemDetail

const styles = StyleSheet.create({
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
    width: '100%',
  },
  mainContainer: {

    width: '100%',
    flex: 1,
  },
  imgContainerM: {
    width: '100%',
    paddingBottom: 10,
    gap: 40,
    top: -20,
    borderRadius: 300
  },
  imageM: {
    alignSelf: 'center',
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  textContainer: {
    flexDirection: 'column',
    height: '30%',
    paddingHorizontal: 10,
  },
  textTitleContainer: {
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 20,
  },
  quantityContainerM: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: 20
  },
  price: {
    width: '100%',
    fontSize: 20,
    marginVertical: 10
  },
  goBack: {
    position: 'absolute',
    alignItems: 'center',
    left: '5%',
    top: '2%',
    zIndex: 1
  },
  shape: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,

  },
})