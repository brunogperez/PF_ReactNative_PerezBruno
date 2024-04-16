import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../constants/colors'
import { FontAwesome5 } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'


const Search = ({ onSearch = () => { }, error = '', goBack = () => { } }) => {

  const [input, setInput] = useState('')

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.inputSearch}
        onChangeText={setInput}
        value={input}
      />
      <Pressable onPress={() => onSearch(input)} >
        <FontAwesome5 name='search' size={24} style={styles.colorIcons} />
      </Pressable>
      <Pressable onPress={() => setInput('')}>
        <FontAwesome5 name='eraser' size={24} style={styles.colorIcons} />
      </Pressable>
      <Pressable onPress={() => goBack('')}>
        <AntDesign name='back' size={24} style={styles.colorIcons} />
      </Pressable>
      {error ? <Text>{error}</Text> : null}
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputSearch: {
    backgroundColor: colors.CaputMortuum,
    width: 250,
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