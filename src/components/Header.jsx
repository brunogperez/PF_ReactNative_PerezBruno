import { Image, Pressable, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import SwitchCustom from './SwitchCustom'
import { backgroundColors } from '../constants/colors'
import { useDispatch, useSelector } from 'react-redux'
import { setDarkMode } from '../features/global/globalSlice'
import CustomShapeDivider from './CustomShapeDivider'

const Header = ({ navigation, route }) => {

  const isHome = route.name

  const dispatch = useDispatch()

  const isDark = useSelector(state => state.globalReducer.value.darkMode)

  const bgColor = isDark ? backgroundColors.Dark : backgroundColors.Light

  const [isEnabled, setIsEnabled] = useState(false)

  const handleTheme = () => {
    setIsEnabled(initialValue => !initialValue)
    dispatch(setDarkMode(!isEnabled))
  }

  return (
    <View style={{ ...styles.container }}>

      <Pressable onPress={() => navigation.navigate('Home')}>
        <Image
          style={styles.logo}
          source={{
            uri: 'https://res.cloudinary.com/divujqlv8/image/upload/v1737412023/Captura_de_pantalla_2025-01-20_192436_hvbalu.webp',
          }}
        />
      </Pressable>

      <SwitchCustom
        isEnabled={isEnabled}
        setIsEnabled={handleTheme}
        style={styles.switch}
      />
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    position: 'absolute',
    justifyContent: 'space-between',
    alignSelf: 'center',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'transparent',
    top: 20,
  },
  logo: {
    height: 50,
    width: 50,
    borderRadius: 8,
    borderColor: 'black',
    borderWidth: 1
  },
  shape: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 150,
  },
})