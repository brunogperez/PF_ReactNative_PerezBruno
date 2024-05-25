import { StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setCategorySelected } from '../features/shop/shopSlice.js'
import TextCustom from './TextCustom.jsx'
import ButtonCustom from './ButtonCustom.jsx'
import { MaterialIcons } from '@expo/vector-icons'
import { colors } from '../constants/colors.js'


const CategoryItem = ({ category, navigation }) => {

  const dispatch = useDispatch()

  const isDark = useSelector(state => state.globalReducer.value.darkMode)
  const colorIcon = isDark ? colors.White : colors.Black

  const nameCategory = category.name[0].toUpperCase() + category.name.substring(1)

  const categoryName = category.name
  const handleNavigate = () => {
    dispatch(setCategorySelected({ categoryName }))
    
    // Cuando se usa navigate, se envian dos parametros el primero es el nombre del componente a 
    // navegar y el segundo es un objeto que son los parámetros a recibir por el componente.
    navigation.navigate('ItemListCategory', { categoryName })
  }

  return (
    <ButtonCustom onPress={handleNavigate} style={styles.cardCategory}>
      <MaterialIcons name={category.icon} size={24} color={colorIcon} />
      <TextCustom style={styles.textCategory}>{nameCategory}</TextCustom>
    </ButtonCustom>
  )
}

export default CategoryItem

const styles = StyleSheet.create({
  cardCategory: {
    backgroundColor: 'transparent',
  },
  textCategory: {
    textAlign: 'center',
    fontSize: 12,
    marginVertical: 5
  }
})