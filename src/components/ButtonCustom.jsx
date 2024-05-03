import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'
import { useSelector } from 'react-redux'

const ButtonCustom = ({ children, onPress }) => {

  const isDark = useSelector(state => state.globalReducer.value.darkMode)
  const bgColor = isDark ? colors.DarkGreen : colors.Mint

  return (
    <TouchableOpacity style={{ ...styles.buttonCustom, backgroundColor: bgColor }} onPress={onPress}>
      {children}
    </TouchableOpacity>
  )
}

export default ButtonCustom

const styles = StyleSheet.create({
  buttonCustom: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 100,
  },
})