import { Pressable, StyleSheet, Text, View } from 'react-native'
import Card from './Card.jsx'
import { colors } from '../constants/colors.js'

const CategoryItem = ({ category, navigation }) => {
  return (
    <Card style={styles.cardCategory}>
      <Pressable
        // Cuando se usa navigate, se envian dos parametros el primero es el nombre del componente a 
        // navegar y el segundo es un objeto que son los parámetros a recibir por el componente.
        onPress={() => navigation.navigate('ItemListCategory', { category })}
      >
        <Text style={styles.textCategory}>{category}</Text>
      </Pressable>
    </Card>
  )
}

export default CategoryItem

const styles = StyleSheet.create({
  cardCategory: {
    width:100,
    marginHorizontal: 3
  },
  textCategory: {
    textAlign: 'center',
    fontSize: 15,
    color: colors.textLight,
  }
})