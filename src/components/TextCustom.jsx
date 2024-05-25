import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { colors } from '../constants/colors'

const TextCustom = ({ children, style }) => {

  const isDark = useSelector(state => state.globalReducer.value.darkMode)
  const colorText = isDark ? colors.White : colors.Black

  return (
    <>
      <Text style={{ color: colorText, ...style }}>{children}</Text>
    </>
  )
}

export default TextCustom

const styles = StyleSheet.create({})