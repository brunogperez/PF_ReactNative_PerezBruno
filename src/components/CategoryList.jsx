import { StyleSheet, Text, View } from 'react-native'
import Card from './Card.jsx'
import { colors } from '../constants/colors.js'

const CategoryList = ({ category }) => {
  return (
    <Card>
      <Text style={styles.textCategory}>{category}</Text>
    </Card>
  )
}

export default CategoryList

const styles = StyleSheet.create({
  textCategory: {
    textAlign: 'center',
    fontSize: 15,
    color: colors.textWhite
  }
})