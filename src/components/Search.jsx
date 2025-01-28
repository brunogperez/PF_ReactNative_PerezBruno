import { Pressable, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { colors, textColors } from '../constants/colors'
import { MaterialIcons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import GoBackCustom from './GoBackCustom'
import LayoutCustom from './LayoutCustom'


const Search = ({ onSearch, navigation }) => {

  const [input, setInput] = useState('')
  const [opacity, setOpacity] = useState(0)

  const isDark = useSelector(state => state.globalReducer.value.darkMode)

  const bgColor = isDark ? colors.Orange : colors.Jaffa
  const textColor = isDark ? textColors.Dark : textColors.Light

  const onFocusSearchBar = () => {
    setOpacity(1)
  }

  onHandleChange = (value) => {
    setInput(value)
    onSearch(value)
  }

  return (
    <LayoutCustom style={styles.inputContainer}>
      <GoBackCustom onPress={() => navigation.goBack()} style={styles.goBack}></GoBackCustom>
      <TextInput
        style={{ ...styles.inputSearch, backgroundColor: bgColor, color: textColor }}
        placeholder=' Search...'
        placeholderTextColor={textColor}
        onChangeText={onHandleChange}
        value={input}
        onFocus={onFocusSearchBar}
      />
      <Pressable onPress={() => setInput('')}>
        <MaterialIcons name="backspace" size={24} style={{ color: bgColor, ...styles.colorIcons, opacity: opacity }} />
      </Pressable>
    </LayoutCustom>
  )
}

export default Search

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 0,
    width: '100%',
    paddingVertical: 25,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  inputSearch: {
    width: '70%',
    height: 40,
    margin: 10,
    borderRadius: 10,
    padding: 10,
  },
  colorIcons: {
    marginHorizontal: 8,
  },

})