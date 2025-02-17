import { StyleSheet, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'
import { useSelector } from 'react-redux'

const Card = ({ children, style }) => {

  const isDark = useSelector(state => state.globalReducer.value.darkMode)
  const bgColor = isDark ? colors.Orange : colors.Jaffa

  return (
    <View style={{ backgroundColor: bgColor, ...styles.container, ...style }}>
      {children}
    </View>
  )
}
export default Card

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 10,
    justifyContent: 'center',
  }
})
