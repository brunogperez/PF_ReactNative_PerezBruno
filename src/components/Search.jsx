import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../constants/colors'
import { FontAwesome5 } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import GoBackCustom from './GoBackCustom'
import LayoutCustom from './LayoutCustom'


const Search = ({ onSearch = () => { }, error = '', navigation }) => {

  const [input, setInput] = useState('')

  const isDark = useSelector(state => state.globalReducer.value.darkMode)

  const color = isDark ? colors.White : colors.Black
  const colorText = isDark? colors.Black : colors.White
 
  return (
    <LayoutCustom style={styles.inputContainer}>
      <GoBackCustom onPress={() => navigation.goBack()}></GoBackCustom>
      <TextInput
        style={{ ...styles.inputSearch, backgroundColor: color, color: colorText }}
        onChangeText={setInput}
        value={input}
      />
      <Pressable onPress={() => onSearch(input)} >
        <FontAwesome5 name='search' size={20} style={{ color: color, ...styles.colorIcons }} />
      </Pressable>
      <Pressable onPress={() => setInput('')}>
        <FontAwesome5 name='eraser' size={20} style={{ color: color, ...styles.colorIcons }} />
      </Pressable>

      {error ? <Text>{error}</Text> : null}
    </LayoutCustom>
  )
}

export default Search

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex:0,
    width: '100%',
  },
  inputSearch: {
    width: '60%',
    height: 40,
    margin: 10,
    borderRadius: 10,
    padding: 10,
    
  },
  colorIcons: {
    marginHorizontal: 8
  }
})