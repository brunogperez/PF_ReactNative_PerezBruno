import { ActivityIndicator, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CategoryItem from '../components/CategoryItem.jsx'
import { colors } from '../constants/colors.js'
import products from '../data/products.json'
import Card from '../components/Card.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { setItemIDSelected } from '../features/shop/shopSlice.js'
import { useGetCategoriesQuery } from '../services/shopService.js'
import TextCustom from '../components/TextCustom.jsx'


const Home = ({ navigation }) => {

  const { data: categories, isLoading } = useGetCategoriesQuery()
  
  const dispatch = useDispatch()

  const isDark = useSelector(state => state.globalReducer.value.darkMode)
  const bgColor = isDark ? colors.DarkGrey : colors.BGLight

  const productRandom = products.find(product => product.id == 2)

  const handleNavigate = () => {
    dispatch(setItemIDSelected(productRandom.title))
    navigation.navigate('ItemDetail', { productID: productRandom.id })
  }

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
          <ActivityIndicator style={styles.indicator} size="large" color={bgColor} />
        )}
      </Card>
      {productRandom && (
        <Card style={styles.cardProductsContainer}>
          <TextCustom style={styles.textProducts}>
            On Sale
          </TextCustom>
          <Card style={styles.cardContainer}>
            <Pressable style={styles.styleProduct} onPress={handleNavigate} >
              <Image
                resizeMode='cover'
                style={styles.imageOnSale}
                source={{ uri: productRandom.images[2] }}
              />
              <TextCustom style={styles.text}>{productRandom.title}</TextCustom>
            </Pressable>
          </Card>
        </Card>
      )}
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