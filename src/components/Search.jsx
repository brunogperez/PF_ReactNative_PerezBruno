import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../constants/colors'
import { FontAwesome5 } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'


const Search = ({ onSearch = () => { }, error = '', navigation }) => {

  const [input, setInput] = useState('')

  return (
    <View style={styles.inputContainer}>
         <Pressable onPress={() => navigation.goBack()} style={styles.goBack}>
        <MaterialIcons name="arrow-back" size={30} style={styles.colorIcons} />
      </Pressable>
      <TextInput
        style={styles.inputSearch}
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
    backgroundColor: colors.Chetsnut,
    width:'100%',
  },
  inputSearch: {
    backgroundColor: colors.Jasper,
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