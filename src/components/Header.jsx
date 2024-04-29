import { Image, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import SwitchCustom from './SwitchCustom'
import { colors } from '../constants/colors'
import { useDispatch, useSelector } from 'react-redux'
import { setDarkMode } from '../features/global/globalSlice'

const Header = ({ navigation }) => {

  const dispatch = useDispatch()

  const isDark = useSelector(state => state.globalReducer.value.darkMode)
  
  const bgColor = isDark ? colors.DarkGreen : colors.Mint

  const { height, width } = useWindowDimensions()

  const [isEnabled, setIsEnabled] = useState(false)

  const handleTheme = () => {
    setIsEnabled(initialValue => !initialValue)
    dispatch(setDarkMode(!isEnabled))
  }

  return (
    <View style={{ backgroundColor: bgColor, ...styles.container }}>
      <Pressable onPress={() => navigation.navigate('Home')}>
        <Image
          style={(width < height) ? styles.logo : styles.logoLandscape}
          source={{
            uri: 'https://res.cloudinary.com/divujqlv8/image/upload/v1713998174/fghdfghdfgh_gjmnht.png',
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
    paddingTop: 30,
    paddingBottom: 15,
    justifyContent: 'space-between',
    alignSelf: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
    width: '100%',
  },
  logo: {
    height: 50,
    width: 100,
    borderRadius: 8
  },

  // Estilos para posicion horizontal del dispositivo

  logoLandscape: {
    height: 70,
    width: 200,
    borderRadius: 4
  }
})