import { FlatList, Image, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import CategoryItem from '../components/CategoryItem.jsx'
import categories from '../data/categories.json'
import brands from '../data/brands.json'
import { colors } from '../constants/colors.js'
import products from '../data/products.json'
import Card from '../components/Card.jsx'

const Home = ({ route, navigation }) => {

  const { width } = useWindowDimensions()
  /*
  Propiedades que envia por defecto al momento de instalar react navigation 
  console.log(route)
  console.log(navigation) 
  */

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item}
        data={categories.sort()}
        renderItem={({ item }) => (
          <CategoryItem
            navigation={navigation}
            category={item}
          />
        )}
      />
      <Text style={styles.text}>
        Ofertas
      </Text>
      <FlatList
        horizontal
        initialNumToRender={10}
        /* numColumns={(width <= 360) ? 2 : 3} */
        showsHorizontalScrollIndicator={false}
        data={products}
        keyExtractor={(product) => product.id}
        renderItem={({ item }) =>
          <Card product={item} style={styles.cardItem} navigation={navigation} >
            <Image
              source={{ uri: item.images[0] }}
              style={(width <= 360) ? styles.imageSM : styles.imageM}
              resizeMode='cover'
            />
          </Card>}
      />

      <View style={styles.brandSection}>
      <Text style={styles.text}>
        Marcas destacadas
      </Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={brand => brand.id}
          data={brands}
          renderItem={({ item }) =>
            <Card product={item} style={styles.brandItem} navigation={navigation} >
              <Image
                source={{ uri: item.image }}
                style={(width <= 360) ? styles.imageSM : styles.imageM}
                resizeMode='contain'
              />
            </Card>}
        />
      </View>

      <Text style={styles.text}>
        Productos Destacados
      </Text>
      <FlatList
        horizontal
        initialNumToRender={10}
        /* numColumns={(width <= 360) ? 2 : 3} */
        showsHorizontalScrollIndicator={false}
        data={products}
        keyExtractor={(product) => product.id}
        renderItem={({ item }) =>
          <Card product={item} style={styles.cardItem} navigation={navigation} >
            <Image
              source={{ uri: item.images[0] }}
              style={(width <= 360) ? styles.imageSM : styles.imageM}
              resizeMode='cover'
            />
          </Card>}
      />
      <Text style={styles.text}>
        Productos Destacados
      </Text>
      <FlatList
        horizontal
        initialNumToRender={10}
        /* numColumns={(width <= 360) ? 2 : 3} */
        showsHorizontalScrollIndicator={false}
        data={products}
        keyExtractor={(product) => product.id}
        renderItem={({ item }) =>
          <Card product={item} style={styles.cardItem} navigation={navigation} >
            <Image
              source={{ uri: item.images[0] }}
              style={(width <= 360) ? styles.imageSM : styles.imageM}
              resizeMode='cover'
            />
          </Card>}

      />
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.Jasper,
    width: '100%',
    height: '100%',
    flexDirection: 'column',

  },
  brandSection: {
    backgroundColor: colors.Chetsnut
  },
  cardItem: {
    width: 150,
    height: 150,
    margin: 5,
  },
  brandItem: {
    
    width: 90,
    height: 70,
    margin:2

  },
  imageSM: {
    width: '100%',
    height: '100%',
    borderRadius: 10
  },
  imageM: {
    width: '100%',
    height: '100%',
    borderRadius: 10
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: colors.textLight,
    marginVertical: 5,
    fontFamily:'Square'
  }
})