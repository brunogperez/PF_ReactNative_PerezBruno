import { Image, Platform, Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import LayoutCustom from '../components/LayoutCustom'
import { useDispatch, useSelector } from 'react-redux'
import { useGetLocationQuery, useGetProfileImageQuery } from '../services/shopService'
import ButtonCustom from '../components/ButtonCustom'
import { clearUser } from '../features/auth/authSlice'
import { clearCart } from '../features/cart/cartSlice'
import TextCustom from '../components/TextCustom'
import { Octicons } from '@expo/vector-icons'
import { backgroundColors, colors, iconColors } from '../constants/colors'
import { truncateSessionsTable } from '../persistence'


const Profile = ({ navigation }) => {

  const dispatch = useDispatch()

  const { imageCamera, localId, user } = useSelector(state => state.authReducer.value) //El localId es el uuid que asigna la base de datos al user

  const { data: location, isLoading, error } = useGetLocationQuery(localId)


  const isDark = useSelector(state => state.globalReducer.value.darkMode)
  const bgColor = isDark ? backgroundColors.Dark : backgroundColors.Light
  const iconColor = isDark ? iconColors.Dark : iconColors.Light


  //Llamado a DB mediante RTK Query para obtener la imagen de perfil del usuario
  const { data: imageFromDB } = useGetProfileImageQuery(localId)

  const launchCamera = async () => {
    navigation.navigate('ImageSelector')
  }

  const handleLogin = async () => {
    navigation.navigate('Login')
  }

  const handleSignOut = async () => {
    try {

      if (Platform.OS != 'web') await truncateSessionsTable()

      dispatch(clearUser())
      dispatch(clearCart())
      navigation.navigate('Home')

    } catch (error) {

    }

  }



  const imageDefault = '../../assets/images/profileDefault.png'

  return (
    <>
      {user ? (
        <LayoutCustom style={{ backgroundColor: bgColor, ...styles.container }}>

          <ButtonCustom style={styles.btnLogout} onPress={handleSignOut}>
            <Octicons name="sign-out" size={20} color={iconColor} />
          </ButtonCustom>

          {(imageFromDB || imageCamera) ? (
            <Image
              source={{ uri: imageFromDB?.image || imageCamera }}
              style={styles.image}
              resizeMode='cover'
            />
          ) : (
            <Image
              source={require(imageDefault)}
              style={styles.image}
              resizeMode='cover'
            />
          )}
          <ButtonCustom onPress={launchCamera} style={styles.btnPicture}>
            {
              (imageCamera || imageFromDB) ?
                <Octicons name="pencil" size={20} color={iconColor} />
                :
                <Octicons name="plus" size={18} color={iconColor} />
            }
          </ButtonCustom>

          <TextCustom style={styles.userText}>
            Email: {user}
          </TextCustom>
          <View style={styles.address}>
            <TextCustom style={styles.addressText}>
              Address : {location ? `${location.address}` : 'No location set'}
            </TextCustom>
            <Pressable style={styles.addressPressable} onPress={() => navigation.navigate('LocationSelector')}>
              {location ?
                <Octicons name="pencil" size={16} color={iconColor} />
                :
                <Octicons name="plus" size={16} color={iconColor} />
              }
            </Pressable>
          </View>
        </LayoutCustom>
      ) : (
        <LayoutCustom style={styles.container}>
          <Image
            source={require(imageDefault)}
            style={styles.image}
            resizeMode='cover'
          />
          <ButtonCustom onPress={handleLogin}>
            <TextCustom>
              Go to Login or Register
            </TextCustom>
          </ButtonCustom>
        </LayoutCustom>
      )}
    </>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    gap: 15,
    flex: 1
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 125,
    alignSelf: 'center'
  },
  userText: {
    textAlign: 'left'
  },
  address: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  addressText: {
    width: '70%'
  },
  btnLogout: {
    position: 'absolute',
    top: 10,
    right: 20
  },
  btnPicture: {
    top: -50,
    alignItems: 'center'
  }
})