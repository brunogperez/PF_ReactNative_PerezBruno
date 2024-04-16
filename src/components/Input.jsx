import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

export const Input = ({ addItem, textItem, handleChangeText }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInput}
        onChangeText={handleChangeText}
        value={textItem.value}
        placeholder={'Add product...'}
      />
      <Pressable onPress={addItem}>
        <Text>Add</Text>
      </Pressable>
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  textInput: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    width: 250,
    fontSize: 16,
  }
})