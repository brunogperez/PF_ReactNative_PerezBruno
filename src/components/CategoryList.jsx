import { Pressable, StyleSheet, Text, View } from 'react-native'
import Card from './Card.jsx'
import { colors } from '../constants/colors.js'

const CategoryList = ({ category, selectCategory = () => { } }) => {
  return (
    <Card>
      <Pressable
        onPress={() => selectCategory(category)}
      >
        <Text style={styles.textCategory}>{category}</Text>
      </Pressable>
    </Card>
  )
}

export default CategoryList

const styles = StyleSheet.create({
  textCategory: {
    textAlign: 'center',
    fontSize: 15,
    color: colors.textLight
  }
})