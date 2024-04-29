import React from 'react'
import { View, Switch, StyleSheet } from 'react-native'
import { colors } from '../constants/colors'

const SwitchCustom = ({
  isEnabled = false,
  setIsEnabled = () => { }
}) => {

  const toggleSwitch = () => setIsEnabled(previousState => !previousState)

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: colors.FlourescentCyan, true: colors.Black }}
        thumbColor={isEnabled ? colors.MintGreen : colors.MintGreen}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  },
})

export default SwitchCustom