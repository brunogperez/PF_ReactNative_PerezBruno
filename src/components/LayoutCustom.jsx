import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'

const LayoutCustom = ({ children }) => {
  isDark = true
  const bgColor = isDark ? colors.Mint : colors.MintGreen
  return (
    <View style={{ ...styles.container, backgroundColor: bgColor }}>
      {children}
    </View>
  )
}

export default LayoutCustom

const styles = StyleSheet.create({
  container: {    
  }
})