import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProductItem from '../components/ProductItem'
import Search from '../components/Search'
import { useGetProductsByCategoryQuery } from '../services/shopService'


const ItemListCategory = ({
  setCategorySelected = () => { },
  route,
  navigation
}) => {


  const [keyword, setKeyword] = useState('')
  const [productsFiltered, setProductsFiltered] = useState([])
  const [error, setError] = useState('')

  const { category: categorySelected } = route.params

  const { data: prodFetched, error: fetchError, isLoading } = useGetProductsByCategoryQuery(categorySelected)

  useEffect(() => {

    //Validamos que la keyword no tenga ningun digito numérico
    regex = /\d/
    const hasNumbers = (regex.test(keyword))
    if (hasNumbers) {
      setError('La busqueda no debe contener números')
      return
    }

    if (!isLoading) {
      //Se realiza un filtrado de los productos para obtener los que coincidan con la busqueda del input
      const prodFilter = prodFetched.filter(product =>
        product.title.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()))
      setProductsFiltered(prodFilter)
      setError('')
    }
  }, [keyword, categorySelected, prodFetched, isLoading])


  return (
    <View style={styles.flatlistContainer}>

      <Search
        onSearch={setKeyword}
        goBack={() => navigation.goBack()}
        error={error}
        style={styles.inputSearch}
        navigation={navigation}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={productsFiltered}
        renderItem={({ item }) =>
          <ProductItem product={item} style={styles.productItem} navigation={navigation} />
        }
        keyExtractor={(product) => product.id}
      />
    </View>
  )
}

export default ItemListCategory

const styles = StyleSheet.create({
  flatlistContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'black'

  },
  inputSearch: {
    width: '100%'
  },
  productItem: {
    alignSelf: 'center',

  },
})