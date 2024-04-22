import { FlatList, Pressable, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import products from '../data/products.json'
import ProductItem from '../components/ProductItem'
import Search from '../components/Search'
import { colors } from '../constants/colors'


const ItemListCategory = ({
  setCategorySelected = () => { },
  route,
  navigation
}) => {

  const [keyword, setKeyword] = useState('')
  const [productsFiltered, setProductsFiltered] = useState('')
  const [error, setError] = useState('')

  const { category } = route.params

  useEffect(() => {

    //Validamos que la keyword no tenga ningun digito numérico
    regex = /\d/
    const hasNumbers = (regex.test(keyword))
    if (hasNumbers) {
      setError('La busqueda no debe contener números')
      return
    }

    //Se realiza un prefiltrado para obtener los productos de la categoria específica
    const filterByCategory = products.filter(product => product.category === category)

    //Se realiza un filtrado de los productos para obtener los que coincidan con la busqueda del input
    const prodFilter = filterByCategory.filter(product => product.title.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()))
    setProductsFiltered(prodFilter)
    setError('')

  }, [keyword, category])


  return (
    <View style={styles.flatlistContainer}>
   
      <Search
        onSearch={setKeyword}
        goBack={() => setCategorySelected('')}
        error={error}
        style={styles.inputSearch}
        navigation={navigation}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={productsFiltered}
        renderItem={({ item }) => <ProductItem product={item} style={styles.productItem} navigation={navigation} />}
        keyExtractor={(product) => product.id}
      />
    </View>
  )
}

export default ItemListCategory

const styles = StyleSheet.create({
  flatlistContainer: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: colors.Jasper
  },
  inputSearch: {
    width: '100%'
  },
  productItem: {
    width: '100%',
  },
})