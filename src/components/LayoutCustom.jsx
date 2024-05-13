import { View, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'
import { useSelector } from 'react-redux'

const LayoutCustom = ({ children, style }) => {

  const isDark = useSelector(state => state.globalReducer.value.darkMode)
  const bgColor = isDark ? colors.Black : colors.MintGreen

  return (
    <View style={{ ...styles.container, backgroundColor: bgColor, ...style }}>
      {children}
    </View>
  )
}

export default LayoutCustom

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
})