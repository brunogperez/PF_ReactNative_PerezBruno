import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'
import { useSelector } from 'react-redux'
import { MaterialIcons } from '@expo/vector-icons'

const GoBackCustom = ({ onPress , style}) => {

  const isDark = useSelector(state => state.globalReducer.value.darkMode)
  const bgColor = isDark ? colors.White : colors.Black

  return (
    <TouchableOpacity style={{...styles.buttonCustom, ...style}} onPress={onPress}>
      <MaterialIcons name="arrow-back" size={30} style={{color:bgColor}} />
    </TouchableOpacity>
  )
}

export default GoBackCustom

const styles = StyleSheet.create({
  buttonCustom: {
    marginHorizontal: 8
  },
})