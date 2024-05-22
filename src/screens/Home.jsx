import { ActivityIndicator, FlatList, Image, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CategoryItem from '../components/CategoryItem'
import Card from '../components/Card'
import TextCustom from '../components/TextCustom'
import { useDispatch, useSelector } from 'react-redux'
import { setItemIDSelected } from '../features/shop/shopSlice.js'
import { useGetCartbyIdQuery, useGetCategoriesQuery, useGetProductsByIDQuery } from '../services/shopService.js'
import { colors } from '../constants/colors.js'
import { fetchSession } from '../persistence'
import { setUser } from '../features/auth/authSlice.js'
import { onCart } from '../features/cart/cartSlice.js'


const Home = ({ navigation }) => {

  const [idRandom, setIDRandom] = useState()

  //Hook para traer las categorias de la DB
  const { data: categories, isLoading } = useGetCategoriesQuery()

  const { data: prodFetched, error: fetchError, isLoading: isLoadingProduct } = useGetProductsByIDQuery(idRandom)

  const dispatch = useDispatch()

  const isDark = useSelector(state => state.globalReducer.value.darkMode)
  const bgColor = isDark ? colors.DarkGrey : colors.BGLight

  useEffect(() => {
    const generateID = Math.floor(Math.random() * 100)
    setIDRandom(generateID)
  }, [])

  const handleNavigate = () => {
    dispatch(setItemIDSelected(prodFetched.title))
    navigation.navigate('ItemDetail', { productID: prodFetched.id })
  }

  const { localId } = useSelector((state) => state.authReducer.value)
  //Hook para traer el cart desde la DB 
  const { data: cartFromDB, isLoading: isLoadingCart, isSuccess } = useGetCartbyIdQuery(localId)

  //Effect para hacerle un fetch a la session y no loguearse cada vez que se abre la app
  useEffect(() => {
    (async () => {
      try {
        const response = await fetchSession()
        if (response.rows._array.length) {
          const user = response.rows._array[0]
          dispatch(setUser({
            email: user.email,
            localId: user.localId,
            idToken: user.token
          }))
        }

      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  useEffect(() => {
    if (localId && isSuccess) {
      dispatch(onCart(cartFromDB))
    }
  }, [localId, isSuccess])

  return (
    <ScrollView style={{ backgroundColor: bgColor, ...styles.container }} showsVerticalScrollIndicator={false}>
      <TextCustom style={styles.textTitle}>Discover</TextCustom>
      <Card style={styles.cardContainer}>
        <Image
          source={{ uri: 'https://res.cloudinary.com/divujqlv8/image/upload/v1713902741/15600086360926_wj01er.jpg' }}
          style={styles.imageHome}
          resizeMode='cover'
        />
      </Card>
      <Card style={styles.cardCategoryContainer}>
        <View style={styles.textCategories}>
          <TextCustom style={styles.text}>Categories</TextCustom>
        </View>
        {!isLoading ? (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            data={categories}
            renderItem={({ item }) => (
              <CategoryItem
                navigation={navigation}
                category={item}
              />
            )}
          />
        ) : (
          <ActivityIndicator style={styles.indicator} size="small" color={bgColor} />
        )}
      </Card>
      <Card style={styles.cardProductsContainer}>
        <TextCustom style={styles.textProducts}>
          On Sale
        </TextCustom>
        {!isLoadingProduct ? (
          <Card style={styles.cardContainer}>
            <Pressable style={styles.styleProduct} onPress={handleNavigate} >
              <Image
                resizeMode='cover'
                style={styles.imageOnSale}
                source={{ uri: prodFetched.images[0] }}
              />
              <TextCustom style={styles.text}>{prodFetched.title}</TextCustom>
            </Pressable>
          </Card>
        ) : (
          <ActivityIndicator style={styles.indicator} size="large" color={bgColor} />
        )}
      </Card>
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
  },
  cardContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  cardCategoryContainer: {
    width: '80%',
    alignSelf: 'center',
    height: 130
  },
  cardProductsContainer: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  cardItemM: {
    width: 150,
    height: 150,
    margin: 5,
  },
  imageM: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imageHome: {
    width: '100%',
    height: 180,
    borderRadius: 10,
  },
  imageOnSale: {
    alignSelf: 'center',
    width: '95%',
    height: 190,
    borderRadius: 10,
    marginTop: 5
  },
  indicator: {
    margin: 11
  },
  textTitle: {
    fontSize: 30,
    fontWeight: '500',
    marginHorizontal: 20,
  },
  text: {
    textAlign: 'left',
    fontSize: 20,
    marginVertical: 5,
    marginHorizontal: 10,
    fontWeight: '500'
  },
  textProducts: {
    textAlign: 'left',
    fontSize: 20,
    marginVertical: 10,
    marginHorizontal: 35,
    fontWeight: 'bold'
  },
  textCategories: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10
  },

  // Estilos para móviles small

  cardItemSM: {
    width: 100,
    height: 100,
    margin: 5,
  },
  imageSM: {
    width: '100%',
    height: '100%',
    borderRadius: 8
  },
})