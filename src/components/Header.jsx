import { Image, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { colors } from '../constants/colors'

const Header = ({ route, navigation }) => {

  const { height, width } = useWindowDimensions()

  return (
    <View style={styles.container}>
      {(route.name != 'Home') && (<Pressable onPress={() => navigation.goBack()} style={styles.goBack}>
        <AntDesign name='back' size={30} style={styles.colorIcons} />
      </Pressable>)}
      <Pressable onPress={() => navigation.navigate('Home')}>
        <Image
          style={(width < height) ? styles.tinyLogo : styles.tinyLogoLandscape}
          source={{
            uri: 'https://res.cloudinary.com/divujqlv8/image/upload/v1713306803/xglccdvcuokh4iwd6gnn.webp',
          }}
        />
      </Pressable>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor:colors.Chetsnut
  },
  goBack: {
    position: 'absolute',
    alignItems: 'center',
    left: '5%',
    top: '80%',
  },
  text: {
    fontSize: 30

  },
  textSM: {
    fontSize: 22

  },
  colorIcons: {
    color: colors.light
  },
  tinyLogo: {
    height: 50,
    width: 100,
    borderRadius: 8
  },

  // Estilos para posicion horizontal del dispositivo

  tinyLogoLandscape: {
    height: 70,
    width: 200,
    borderRadius: 4
  }
})