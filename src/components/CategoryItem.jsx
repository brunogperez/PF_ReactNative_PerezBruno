import { Pressable, StyleSheet, Text } from 'react-native'
import Card from './Card.jsx'
import { colors } from '../constants/colors.js'
import { useDispatch } from 'react-redux'
import { setCategorySelected } from '../features/shop/shopSlice.js'

const CategoryItem = ({ category, navigation }) => {

  const dispatch = useDispatch()

  const handleNavigate = () => {
    dispatch(setCategorySelected({ category }))
    navigation.navigate('ItemListCategory', { category })
  }

  return (
    <Card style={styles.cardCategory}>
      <Pressable
        // Cuando se usa navigate, se envian dos parametros el primero es el nombre del componente a 
        // navegar y el segundo es un objeto que son los parámetros a recibir por el componente.
        onPress={handleNavigate}
      >
        <Text style={styles.textCategory}>{category}</Text>
      </Pressable>
    </Card>
  )
}

export default CategoryItem

const styles = StyleSheet.create({
  cardCategory: {
    width: 100,
    marginHorizontal: 3
  },
  textCategory: {
    textAlign: 'center',
    fontSize: 15,
    color: colors.textLight,
  }
})