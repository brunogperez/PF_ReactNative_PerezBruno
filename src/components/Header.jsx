import { Image, StyleSheet, View, useWindowDimensions } from 'react-native'
import React from 'react'

const Header = () => {

  const { height, width } = useWindowDimensions()

  return (
    <View style={styles.container}>
      <Image
        style={(width < height) ? styles.tinyLogo : styles.tinyLogoLandscape}
        source={{
          uri: 'https://res.cloudinary.com/divujqlv8/image/upload/v1713306803/xglccdvcuokh4iwd6gnn.webp',
        }}
      />
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    fontSize: 30

  },
  textSM: {
    fontSize: 22

  },
  tinyLogo: {
    height: 80,
    width: 200,
    borderRadius: 8
  },

  // Estilos para posicion horizontal del dispositivo

  tinyLogoLandscape: {
    height: 40,
    width: 100,
    borderRadius: 4
  }
})