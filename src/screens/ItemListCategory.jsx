import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProductItem from '../components/ProductItem'
import Search from '../components/Search'
import { useGetProductsByCategoryQuery } from '../services/shopService'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import LayoutCustom from '../components/LayoutCustom'
import TextCustom from '../components/TextCustom'


const ItemListCategory = ({
  route,
  navigation
}) => {

  //Obtenemos la altura del bottomTabNavigator a partir de un hook para poder realizar un paddingBottom y no componentes
  const tabBarHeight = useBottomTabBarHeight() + 40

  const [keyword, setKeyword] = useState('')
  const [productsFiltered, setProductsFiltered] = useState([])
  const [error, setError] = useState('')

  const { categoryName: categorySelected } = route.params

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

    <LayoutCustom style={{ ...styles.container }}>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <>
          <Search
            onSearch={setKeyword}
            goBack={() => navigation.goBack()}
            error={error}
            style={styles.inputSearch}
            navigation={navigation}
          />
          {(productsFiltered.length) ? (
            <FlatList
              style={{}}
              showsVerticalScrollIndicator={false}
              keyExtractor={(product) => product.id}
              contentContainerStyle={{ paddingBottom: 60 }}
              data={productsFiltered}
              renderItem={({ item }) =>
                <ProductItem product={item} style={styles.productItem} navigation={navigation} />
              }
            />
          ) : (
            <TextCustom style={styles.textSearch}>
              No se encontró el producto
            </TextCustom>
          )
          }
        </>
      )
      }
    </LayoutCustom>
  )
}

export default ItemListCategory

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',

  },
  inputSearch: {
    width: '10%'
  },
  productItem: {
    alignSelf: 'center'
  },
  textSearch: {
    alignSelf: 'center',
    flex: 1,
    marginVertical: '50%'
  }
})