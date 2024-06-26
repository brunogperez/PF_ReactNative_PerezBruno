import { Image, Pressable, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import SwitchCustom from './SwitchCustom'
import { colors } from '../constants/colors'
import { useDispatch, useSelector } from 'react-redux'
import { setDarkMode } from '../features/global/globalSlice'

const Header = ({ navigation, route }) => {

  const isHome = route.name

  const dispatch = useDispatch()

  const isDark = useSelector(state => state.globalReducer.value.darkMode)

  const bgColor = isDark ? colors.DarkGrey : colors.BGLight

  const [isEnabled, setIsEnabled] = useState(false)

  const handleTheme = () => {
    setIsEnabled(initialValue => !initialValue)
    dispatch(setDarkMode(!isEnabled))
  }

  return (
    <View style={{ backgroundColor: bgColor, ...styles.container }}>
      <Pressable onPress={() => navigation.navigate('Home')}>
        <Image
          style={styles.logo}
          source={{
            uri: 'https://res.cloudinary.com/divujqlv8/image/upload/v1713998174/fghdfghdfgh_gjmnht.png',
          }}
        />
      </Pressable>
      {(isHome == 'Shop') &&
        <SwitchCustom
          isEnabled={isEnabled}
          setIsEnabled={handleTheme}
          style={styles.switch}
        />}
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 40,
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
    borderRadius: 8,
    borderColor: 'black',
    borderWidth: 1
  }
})