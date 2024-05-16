import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../constants/colors'
import TextCustom from './TextCustom';
import { useSelector } from 'react-redux';

const InputForm = ({
  label,
  onChange,
  error = "",
  isSecure = false
}) => {

  const [input, setInput] = useState("");
  const onChangeText = (text) => {
    setInput(text)
    onChange(text)
  }

  const isDark = useSelector(state => state.globalReducer.value.darkMode)

  const colorText = isDark ? colors.White : colors.Black

  return (
    <View style={styles.inputContainer}>
      <TextCustom style={styles.subtitle}>{label}</TextCustom>
      <TextInput
        style={{ ...styles.input, color: colorText }}
        value={input}
        onChangeText={onChangeText}
        secureTextEntry={isSecure}
      />
      {error ?
        <TextCustom style={styles.error}>
          {error}
        </TextCustom>
        :
        null
      }
    </View>
  )
}

export default InputForm

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%'
  },
  subtitle: {
    width: '90%',
    fontSize: 16,
  },
  error: {
    paddingVertical: 3,
    fontSize: 16,
    color: 'red',
  },
  input: {
    width: '90%',
    borderWidth: 0,
    borderBottomWidth: 2,
    borderBottomColor: colors.white,
    padding: 2,

    fontSize: 14,
  }
})