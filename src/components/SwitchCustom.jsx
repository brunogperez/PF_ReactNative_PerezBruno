import React from 'react'
import { View, Switch, StyleSheet } from 'react-native'
import { backgroundColors, colors } from '../constants/colors'

const SwitchCustom = ({
  isEnabled = false,
  setIsEnabled = () => { }
}) => {

  const toggleSwitch = () => setIsEnabled(previousState => !previousState)

  return (
    <View>
      <Switch
        trackColor={{ false: backgroundColors.Dark, true: backgroundColors.Light }}
        thumbColor={isEnabled ? colors.Jaffa : colors.Jaffa}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  )
}

const styles = StyleSheet.create({})

export default SwitchCustom