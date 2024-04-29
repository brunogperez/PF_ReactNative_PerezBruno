import { StyleSheet, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'

const Card = ({ children, style }) => {
  isDark = true
  const bgColor = isDark ? colors.Mint : colors.MintGreen
  return (
    <View style={{ backgroundColor:bgColor,...styles.container, ...style  }}>
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
