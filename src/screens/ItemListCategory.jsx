import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProductItem from '../components/ProductItem'
import Search from '../components/Search'
import LayoutCustom from '../components/LayoutCustom'
import TextCustom from '../components/TextCustom'
import { useGetProductsByCategoryQuery } from '../services/shopService'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'


const ItemListCategory = ({
  route,
  navigation
}) => {

  const tabBarHeight = useBottomTabBarHeight() + 10
  const [keyword, setKeyword] = useState('')
  const [productsFiltered, setProductsFiltered] = useState([])
  const [error, setError] = useState('')
  const { categoryName: categorySelected } = route.params
  const { data: prodFetched, error: fetchError, isLoading } = useGetProductsByCategoryQuery(categorySelected)

  useEffect(() => {
    const validateKeyword = (keyword) => {
      const hasNumbers = /\d/.test(keyword);
      if (hasNumbers) {
        setError('La búsqueda no debe contener números');
        return false;
      }
      return true;
    };

    const filterProducts = (products, keyword) => {
      return products.filter(product =>
        product.title.toLowerCase().includes(keyword.toLowerCase())
      );
    };

    if (!validateKeyword(keyword)) {
      return;
    }

    if (!isLoading) {
      const filteredProducts = filterProducts(prodFetched, keyword);
      setProductsFiltered(filteredProducts);
      setError('');
    }
  }, [keyword, categorySelected, prodFetched, isLoading]);

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
              style={{  }}
              showsVerticalScrollIndicator={false}
              keyExtractor={(product) => product.id}
              contentContainerStyle={{ paddingBottom: tabBarHeight }}
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
    backgroundColor: 'transparent',
  },
  inputSearch: {
    width: '10%'
  },
  productItem: {
    alignSelf: 'center',
    
  },
  textSearch: {
    alignSelf: 'center',
    flex: 1,
    marginVertical: '50%'
  }
})