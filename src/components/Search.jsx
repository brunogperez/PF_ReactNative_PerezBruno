import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../constants/colors'
import { FontAwesome5 } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import GoBackCustom from './GoBackCustom'


const Search = ({ onSearch = () => { }, error = '', navigation }) => {

  const [input, setInput] = useState('')

  const isDark = useSelector(state => state.globalReducer.value.darkMode)

  const bgColor = isDark ? colors.DarkGreen : colors.Mint

  const bgInput = isDark ? colors.Mint : colors.DarkGreen

  return (
    <View style={{ ...styles.inputContainer, backgroundColor: bgColor }}>
      <GoBackCustom onPress={() => navigation.goBack()}></GoBackCustom>
      <TextInput
        style={{ ...styles.inputSearch, backgroundColor: bgInput }}
        onChangeText={setInput}
        value={input}
      />
      <Pressable onPress={() => onSearch(input)} >
        <FontAwesome5 name='search' size={20} style={styles.colorIcons} />
      </Pressable>
      <Pressable onPress={() => setInput('')}>
        <FontAwesome5 name='eraser' size={20} style={styles.colorIcons} />
      </Pressable>

      {error ? <Text>{error}</Text> : null}
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    width: '100%',
  },
  inputSearch: {
    backgroundColor: colors.DarkGreen,
    width: '60%',
    height: 40,
    margin: 10,
    borderRadius: 10,
    padding: 10,
    color: colors.textLight
  },
  colorIcons: {
    color: colors.light,
    marginHorizontal: 8
  }
})