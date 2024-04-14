import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CategoryList from '../components/CategoryList.jsx'
import categories from '../data/categories.json'
import { colors } from '../constants/colors.js'


const Home = () => {
  return (
    <View style={styles.flatlistContainer}>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item}
        data={categories.sort()}
        renderItem={({ item }) => <CategoryList category={item} />}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  flatlistContainer: {
    backgroundColor: colors.Jasper,
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

  }

})