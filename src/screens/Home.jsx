import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import CategoryItem from '../components/CategoryItem.jsx'
import categories from '../data/categories.json'
import { colors } from '../constants/colors.js'
import products from '../data/products.json'
import Card from '../components/Card.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { setItemIDSelected } from '../features/shop/shopSlice.js'

const Home = ({ navigation }) => {


  const isDark = useSelector(state => state.globalReducer.value.darkMode)

  const bgColor = isDark ? colors.Black : colors.MintGreen

  const dispatch = useDispatch()

  const idRandom = Math.floor(Math.random(10) * 10)
  const productRandom = products.find(product => product.id == 1)



  const handleNavigate = () => {
    dispatch(setItemIDSelected(productRandom.title))
    navigation.navigate('ItemDetail', { productID: productRandom.id })
  }


  return (
    <ScrollView style={{ backgroundColor: bgColor, ...styles.container }} showsVerticalScrollIndicator={false}>
      <Card style={styles.cardContainer}>
        <Image
          source={{ uri: 'https://res.cloudinary.com/divujqlv8/image/upload/v1713902741/15600086360926_wj01er.jpg' }}
          style={styles.imageHome}
          resizeMode='cover'
        />
      </Card>
      <Card style={styles.cardCategoryContainer}>
        <View style={styles.textCategories}>
          <Text style={styles.text}>
            Categories
          </Text>
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item}
          data={categories}
          renderItem={({ item }) => (
            <CategoryItem
              navigation={navigation}
              category={item}
            />
          )}
        />
      </Card>

      {productRandom && (<Card style={styles.cardProductsContainer}>
        <Text style={styles.textProducts}>
          On Sale
        </Text>
        <Card style={styles.cardContainer}>
          <Pressable style={styles.styleProduct} onPress={handleNavigate} >
            <Image
              resizeMode='cover'
              style={styles.imageOnSale}
              source={{ uri: productRandom.images[1] }}
            />
            <Text style={styles.text}>{productRandom.title}</Text>
          </Pressable>
        </Card>
      </Card>)}
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
  },
  cardProductsContainer: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#dcdcdc'
  },
  cardItemM: {
    width: 150,
    height: 150,
    margin: 5,
    backgroundColor: '#b5bac9'
  },
  brandItem: {
    width: 90,
    height: 50,
    margin: 1
  },
  imageM: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imageHome: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  imageOnSale: {
    alignSelf: 'center',
    width: '95%',
    height: 200,
    borderRadius: 10,
    marginTop: 5
  },
  text: {
    textAlign: 'left',
    fontSize: 20,
    color: colors.textDark,
    marginVertical: 5,
    marginHorizontal: 10,
    fontWeight: '500'
  },
  textProducts: {
    textAlign: 'left',
    fontSize: 20,
    color: colors.textDark,
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