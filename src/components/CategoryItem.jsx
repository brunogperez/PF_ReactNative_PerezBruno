import { StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import { setCategorySelected } from '../features/shop/shopSlice.js'
import TextCustom from './TextCustom.jsx'
import ButtonCustom from './ButtonCustom.jsx'

const CategoryItem = ({ category, navigation }) => {

  const dispatch = useDispatch()

  const handleNavigate = () => {
    dispatch(setCategorySelected({ category }))
    // Cuando se usa navigate, se envian dos parametros el primero es el nombre del componente a 
    // navegar y el segundo es un objeto que son los parámetros a recibir por el componente.
    navigation.navigate('ItemListCategory', { category })
  }

  return (
    <ButtonCustom onPress={handleNavigate} style={styles.cardCategory}>
      <TextCustom style={styles.textCategory}>{category}</TextCustom>
    </ButtonCustom>
  )
}

export default CategoryItem

const styles = StyleSheet.create({
  cardCategory: {
    backgroundColor:'transparent'
  },
  textCategory: {
    textAlign: 'center',
    fontSize: 15,
  }
})