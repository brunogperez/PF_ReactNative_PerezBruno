import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { textColors } from '../constants/colors'

const TextCustom = ({ children, style }) => {

  const isDark = useSelector(state => state.globalReducer.value.darkMode)
  const textColor = isDark ? textColors.Dark : textColors.Light

  return (
    <>
      <Text style={{ color: textColor, ...style }}>{children}</Text>
    </>
  )
}

export default TextCustom

const styles = StyleSheet.create({})