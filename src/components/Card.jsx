import { StyleSheet, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'
import { useSelector } from 'react-redux'

const Card = ({ children, style }) => {

  const isDark = useSelector(state => state.globalReducer.value.darkMode)

  const bgColor = isDark ? colors.CastletonGreen : colors.Turquoise

  return (
    <View style={{ ...styles.container, ...style, backgroundColor: bgColor }}>
      {children}
    </View>
  )
}
export default Card

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
    justifyContent: 'center',
  }
})
